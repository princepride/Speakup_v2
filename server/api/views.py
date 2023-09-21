from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
import yt_dlp
from pycaption import WebVTTReader, SRTWriter
import time
import os
from util.process_subtitle import process_subtitle
from util.api import ChatGPT
import json
from base.models import Youtube, SubSubtitle, Record, Evaluation, Bookmark, DailyTask, WeeklyTask, UserInformation
from django.utils import timezone
from django.db.models import Sum
from rest_framework.authtoken.models import Token
from datetime import timedelta
from django.forms.models import model_to_dict
from util.algorithm import generate_daily_tasks,generate_weekly_tasks
import openai
import wave

with open(r'config.json') as file:
    json_data = json.load(file)


settings.JSON_DATA = json_data
openai.api_key = json_data["OPENAI_API_KEY"]

def read_file(file_path):
    # 获取脚本的父路径
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # 拼接文件的完整路径
    full_path = os.path.join(parent_dir, file_path)
    
    with open(full_path, 'r', encoding='utf-8') as file:
        file_text = file.read()
    return file_text

def calculate_duration(file_path):
    # Open the audio file using the wave module
    with wave.open(file_path, "rb") as audio:
        # Get the total number of frames in the audio file
        n_frames = audio.getnframes()
        # Get the sample rate of the audio file
        sample_rate = audio.getframerate()
        # Calculate the duration
        duration = n_frames / sample_rate
    return duration

class FinalChatGPT:
    def __init__(self, type) -> None:
        self.type = type

    def response(self, model, prompt) -> str:
        if self.type == 'access_token':
            chatGPT = ChatGPT(json_data["ACCESS_TOKENS"])
            result = chatGPT.talk(prompt=prompt, model=model, message_id="aaa2f50e-0bb1-4f64-94b8-d57e3fca6d25", parent_message_id="")
            last_item = None
            # 遍历生成器并保存最后一个元素
            for item in result[2]:
                last_item = item
            return last_item['message']['content']['parts'][0]
        elif self.type == 'api_key':
            result = openai.ChatCompletion.create(model=model,messages=[{"role": "user", "content": prompt}],temperature=0.3,max_tokens=1024)
            return result["choices"][0]["message"]["content"]
        else:
            return "unknown error"
        
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    # 验证用户名和密码
    user = UserInformation.objects.filter(username=username, password=password).first()
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'id':user['id']}, status=200)
    else:
        return Response({"error": "User name or password error!"}, status=400)
    
@api_view(['POST'])
def download_youtube(request):
    youtube_url = request.data.get('youtube_url', None)

    if youtube_url is None:
        return Response({"error": "URL not provided"}, status=400)
    
    if not Youtube.objects.filter(youtube_id=youtube_url[-11:]).exists():
        ydl_opts = {
            'writesubtitles': True,
            'writeautomaticsub': True,  # Download auto-generated subtitles
            'subtitleslangs': ['en', 'zh', 'zh-TW'],  # Only download English subtitles
            'outtmpl': 'videos/%(title)s-%(id)s.%(ext)s',
            'skip_download': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            try:
                info = ydl.extract_info(youtube_url, download=True)
            except yt_dlp.DownloadError as e:
                return Response({"error": str(e)}, status=400)
            # Get video duration and thumbnail
            video_duration = info.get('duration')

            subtitle_file_en = ydl.prepare_filename(info).rpartition('.')[0] + ".en.vtt"
            subtitle_file_zh = ydl.prepare_filename(info).rpartition('.')[0] + ".zh.vtt"
            subtitle_file_zh_TW = ydl.prepare_filename(info).rpartition('.')[0] + ".zh-TW.vtt"
        # Wait for the download to finish
        while not os.path.exists(subtitle_file_en) and not os.path.exists(subtitle_file_zh) and not os.path.exists(subtitle_file_zh_TW):
            time.sleep(1)
        if os.path.exists(subtitle_file_en):
            new_youtube_video = Youtube.objects.create(youtube_id=info['id'], youtube_name=ydl.prepare_filename(info), youtube_duration=video_duration, subtitle_name=subtitle_file_en)
            new_youtube_video.save()
            # Convert EN VTT to EN SRT
            with open(subtitle_file_en, 'r', encoding='utf-8', errors='replace') as f:
                captions = WebVTTReader().read(f.read().replace('\ufffd', ' '))

            srt_file = subtitle_file_en.replace('.vtt', '.srt')
            with open(srt_file, 'w', encoding='utf-8', errors='replace') as f:
                f.write(SRTWriter().write(captions))

            os.remove(subtitle_file_en)

            process_subtitle(srt_file, srt_file.replace(".en.srt", " processed.en.srt"))

            # Delete original subtitle file
            os.remove(srt_file)

        elif os.path.exists(subtitle_file_zh):
            new_youtube_video = Youtube.objects.create(youtube_id=info['id'], youtube_name=ydl.prepare_filename(info), youtube_duration=video_duration, subtitle_name=subtitle_file_zh)
            new_youtube_video.save()
            # Convert ZH VTT to ZH SRT
            with open(subtitle_file_zh, 'r', encoding='utf-8', errors='replace') as f:
                captions = WebVTTReader().read(f.read().replace('\ufffd', ' '))

            srt_file = subtitle_file_zh.replace('.vtt', '.srt')
            with open(srt_file, 'w', encoding='utf-8', errors='replace') as f:
                f.write(SRTWriter().write(captions))

            os.remove(subtitle_file_zh)

            process_subtitle(srt_file, srt_file.replace(".zh.srt", " processed.zh.srt"))

            # Delete original subtitle file
            os.remove(srt_file)
        elif os.path.exists(subtitle_file_zh_TW):
            new_youtube_video = Youtube.objects.create(youtube_id=info['id'], youtube_name=ydl.prepare_filename(info), youtube_duration=video_duration, subtitle_name=subtitle_file_zh_TW)
            new_youtube_video.save()
            # Convert ZH VTT to ZH SRT
            with open(subtitle_file_zh_TW, 'r', encoding='utf-8', errors='replace') as f:
                captions = WebVTTReader().read(f.read().replace('\ufffd', ' '))

            srt_file = subtitle_file_zh_TW.replace('.vtt', '.srt')
            with open(srt_file, 'w', encoding='utf-8', errors='replace') as f:
                f.write(SRTWriter().write(captions))

            os.remove(subtitle_file_zh_TW)

            process_subtitle(srt_file, srt_file.replace(".zh-TW.srt", " processed.zh-TW.srt"))

            # Delete original subtitle file
            os.remove(srt_file)
    youtube = Youtube.objects.get(youtube_id=youtube_url[-11:])
    subtitle = read_file(youtube.subtitle_name.replace(".en.vtt", " processed.en.srt").replace(".zh.vtt", " processed.zh.srt").replace(".zh-TW.vtt", " processed.zh-TW.srt"))
    youtube_id = youtube.youtube_id
    sub_subtitle_results = SubSubtitle.objects.filter(youtube_id=youtube_id, condition=True)
    sub_subtitle_data = [{'id':sub_subtitle_result.id, 'startTime': sub_subtitle_result.start_time, 'endTime': sub_subtitle_result.end_time, 'text': sub_subtitle_result.text} for sub_subtitle_result in sub_subtitle_results]
    record_data = []
    evaluation_data = []
    for data in sub_subtitle_data:
        record_results = Record.objects.filter(sub_subtitle_id=data['id'])
        evaluation_results = Evaluation.objects.filter(sub_subtitle_id=data['id'])
        record_data.append([{'id':record_result.id, 'text':record_result.text} for record_result in record_results])
        evaluation_data.append([{'id':evaluation_result.id, 'text':evaluation_result.text} for evaluation_result in evaluation_results])
    is_bookmark = False
    bookmark = Bookmark.objects.filter(youtube_id=youtube_id)
    if bookmark.exists():
        is_bookmark = True
    return Response({"subSubtitle":sub_subtitle_data, "record":record_data, "evaluation":evaluation_data, "subtitle":subtitle, "isBookmark":is_bookmark}, status=200)

@api_view(['POST'])
def speech_recognition(request):
    request_type = request.data.get('request_type', None)
    sub_subtitle_id = request.data.get('sub_subtitle_id', None)
    id = request.data.get('id', None)
    if 'audio' not in request.FILES:
            return Response({'error': 'No audio file provided'}, status=400)
        
    audio_file = request.FILES['audio']
    os.makedirs('sounds', exist_ok=True)
    # Save the file to disk
    with open('sounds/speech.wav', 'wb+') as destination:
        for chunk in audio_file.chunks():
            destination.write(chunk)
    # Fix wav file
    os.system('ffmpeg -y -i sounds/speech.wav -vn -acodec pcm_s16le -ar 16000 -ac 1 sounds/speech_fixed.wav')
    # Load the wav file
    full_transcription = ""
    if settings.JSON_DATA["SPEECH_RECOGNITION_TYPE"] == "api_key":
        audio_file= open("sounds/speech_fixed.wav", "rb")
        duration = calculate_duration("sounds/speech_fixed.wav")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        full_transcription = transcript["text"]

    if request_type == 'update':
        record = Record.objects.get(id=id)
        record.sub_subtitle_id = sub_subtitle_id
        record.text = full_transcription
        record.attempt_times += 1
        record.duration += duration
        record.last_update_time = timezone.now()
        record.save()
    elif request_type == 'insert':
        record = Record(sub_subtitle_id=sub_subtitle_id, text=full_transcription, attempt_times=1, duration=duration)
        record.save()
    return Response({'transcription': full_transcription, 'id': record.id}, status=200)

# model: gpt-4, gpt-3.5-turbo, text-moderation-playground
@api_view(['POST'])
def chatGPT(request):
    # chatGPT = ChatGPT(access_tokens=settings.JSON_DATA["ACCESS_TOKENS"])
    chatGPT = FinalChatGPT(settings.JSON_DATA["CHATGPT_TYPE"])
    request_type = request.data.get('request_type', None)
    id = request.data.get('id', None)
    sub_subtitle_id = request.data.get('sub_subtitle_id', None)
    mission_type = request.data.get('mission_type', None)
    prompt = request.data.get('prompt', None)
    model = request.data.get('model', None)
    result = chatGPT.response(model=model, prompt=prompt)
    # result = chatGPT.talk(prompt=prompt, model=model, message_id="aaa2f50e-0bb1-4f64-94b8-d57e3fca6d25", parent_message_id="")

    if request_type == 'update':
        evaluation = Evaluation.objects.get(id=id)
        evaluation.sub_subtitle_id = sub_subtitle_id
        evaluation.mission_type = mission_type
        evaluation.model = model
        evaluation.text = result
        evaluation.last_update_time = timezone.now()
        evaluation.save()
        return Response({"id": evaluation.id, "text": result}, status=200)
    elif request_type == 'insert':
        evaluation = Evaluation(sub_subtitle_id=sub_subtitle_id, mission_type=mission_type, model=model, text=result)
        evaluation.save()
        return Response({ "id": evaluation.id, "text": result}, status=200)

@api_view(['POST'])
def insert_sub_subtitle(request):
    youtube_id = request.data.get('youtube_id')
    start_time = request.data.get('start_time')
    end_time = request.data.get('end_time')
    text = request.data.get('text')
    sub_subtitle = SubSubtitle(youtube_id=youtube_id, start_time=start_time, end_time=end_time, text=text, condition=True)
    sub_subtitle.save()
    return Response({ "id": sub_subtitle.id, "startTime":start_time, "endTime":end_time, "text": text}, status=200)

@api_view(['POST'])
def delete_sub_subtitle(request):
    sub_subtitle_id = request.data.get('sub_subtitle_id')
    if not sub_subtitle_id:
        return Response({"error": "No id provided"}, status=400)

    try:
        sub_subtitle = SubSubtitle.objects.get(id=sub_subtitle_id)
        sub_subtitle.condition = False
        sub_subtitle.last_update_time = timezone.now()
        sub_subtitle.save()
        return Response({"message": "SubSubtitle updated successfully"}, status=200)
        
    except SubSubtitle.DoesNotExist:
        return Response({"error": "SubSubtitle with this id does not exist"}, status=404)
    
@api_view(['POST'])
def remove_bookmark(request):
    youtube_id = request.data.get('youtube_id')
    bookmarks = Bookmark.objects.filter(youtube_id=youtube_id)
    if bookmarks.exists():
        bookmarks.delete()
        return Response({"success": "Bookmarks with this id have been deleted"}, status=200)
    else:
        return Response({"error": "Bookmark with this id does not exist"}, status=404)
    
@api_view(['POST'])
def add_bookmark(request):
    youtube_id = request.data.get('youtube_id')
    
    if not youtube_id:
        return Response({"error": "Youtube ID is required"}, status=400)
    
    try:
        bookmark = Bookmark.objects.create(youtube_id=youtube_id)
        return Response({"success": f"Bookmark with id {bookmark.youtube_id} has been created"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def select_all_bookmarks(request):
    bookmarks = Bookmark.objects.all()
    response = []
    
    for bookmark in bookmarks:
        try:
            youtube = Youtube.objects.get(youtube_id=bookmark.youtube_id)
            response.append({
                "youtube_id": youtube.youtube_id,
                "youtube_name": youtube.youtube_name,
                "youtube_duration": youtube.youtube_duration,
            })
        except Exception:
            return Response({"error": f"Youtube object with id {bookmark.youtube_id} does not exist"},
                            status=404)

    return Response(response, status=200)

@api_view(['POST'])
def get_statistic(request):
    evaluations = Evaluation.objects.all().order_by('last_update_time')
    data = []
    # Extract all dates
    dates = [timezone.localtime(evaluation.last_update_time).date() for evaluation in evaluations]

    # Convert list to set to remove duplicates and then convert it back to list
    unique_dates = list(set(dates))
    for unique_date in unique_dates:
        evaluations_on_date = Evaluation.objects.filter(last_update_time__date=unique_date)
        categories = ['Paraphrase', 'Seque', 'Zh-En', 'Conversation']
        videonames = []
        for evaluation_on_date in evaluations_on_date:
            youtube_id = SubSubtitle.objects.get(id = evaluation_on_date.sub_subtitle_id).youtube_id
            youtube_name = Youtube.objects.get(youtube_id = youtube_id).youtube_name
            #videonames.append(youtube_name[7:][:-16])
            videonames.append(youtube_name)
        videonames = list(set(videonames))
        specificDuration=[[0] * 4 for _ in range(len(videonames))]
        for videoname in videonames:
            for category in categories:
                # 首先根据给定的youtube_name获取对应的youtube_id
                youtube_id = Youtube.objects.get(youtube_name=videoname).youtube_id

                # 然后，根据获取的youtube_id，查找SubSubtitle对象的id
                sub_subtitle_ids = SubSubtitle.objects.filter(youtube_id=youtube_id).values_list('id', flat=True)

                # 最后，根据sub_subtitle_id和mission_type过滤Evaluation对象
                filtered_evaluations = evaluations_on_date.filter(sub_subtitle_id__in=sub_subtitle_ids, mission_type=category)
                # Convert the queryset to a list
                filtered_evaluations_list = list(filtered_evaluations)

                time_difference = timedelta()

                # Loop through the evaluations, comparing each one to the next
                for current_eval, next_eval in zip(filtered_evaluations_list, filtered_evaluations_list[1:]):
                    diff = next_eval.last_update_time - current_eval.last_update_time
                    if diff <= timedelta(minutes=5):
                        time_difference += diff
                specificDuration[videonames.index(videoname)][categories.index(category)] = int((time_difference + (timedelta(minutes=1) if len(filtered_evaluations_list) > 0 else timedelta(minutes=0))).total_seconds() / 60)
        duration = [0] * len(videonames)
        for i in range(len(videonames)):
            duration[i] = sum(specificDuration[i])
        totalDuration = sum(duration)
        data.append({
            'date':unique_date.strftime('%Y-%m-%d'),
            'totalDuration':totalDuration,
            'categories':categories,
            'videonames':[videoname[7:][:-16] for videoname in videonames],
            'duration':duration,
            'specificDuration':specificDuration
        })
    extraExp = 0
    filter_daily_tasks = DailyTask.objects.filter(isFinish = True)
    exp_daily = filter_daily_tasks.aggregate(Sum('exp'))['exp__sum']
    extraExp += exp_daily if exp_daily is not None else 0
    filter_weekly_tasks = WeeklyTask.objects.filter(isFinish = True)
    exp_weekly = filter_weekly_tasks.aggregate(Sum('exp'))['exp__sum']
    extraExp += exp_weekly if exp_weekly is not None else 0
    return Response({"data": data, "extraExp": extraExp}, status=200)

@api_view(['POST'])
def get_tasks(request):
    def get_or_create_daily_tasks(n):
        # Get current time in UTC
        now_utc = timezone.now()

        # Convert to local time
        now_local = timezone.localtime(now_utc)

        # Get the date part
        date_today = now_local.date()
        daily_tasks = DailyTask.objects.filter(created_time__date=date_today)
        if not daily_tasks.exists():
            generated_tasks = generate_daily_tasks(n)
            for task in generated_tasks:
                DailyTask.objects.create(
                    task_id=task["task_id"],
                    name_en=task["name_en"],
                    name_zh=task["name_zh"],
                    description_en=task["description_en"],
                    description_zh=task["description_zh"],
                    exp=task["exp"],
                    total = task["total"],
                    isFinish = task["isFinish"],
                )
        daily_tasks = DailyTask.objects.filter(created_time__date=date_today)
        return [model_to_dict(task) for task in daily_tasks]

    def get_or_create_weekly_tasks():
        # Get current time in UTC
        now_utc = timezone.now()

        # Convert to local time
        now_local = timezone.localtime(now_utc)

        # Get the date part
        date_today = now_local.date()
        start_week = date_today - timedelta(date_today.weekday())
        end_week = start_week + timedelta(6)
        weekly_tasks = WeeklyTask.objects.filter(created_time__date__range=[start_week, end_week])

        if not weekly_tasks.exists():
            generated_tasks = generate_weekly_tasks()
            for task in generated_tasks:
                WeeklyTask.objects.create(
                    task_id=task["task_id"],
                    name_en=task["name_en"],
                    name_zh=task["name_zh"],
                    description_en=task["description_en"],
                    description_zh=task["description_zh"],
                    exp=task["exp"],
                    total = task["total"],
                    isFinish = task["isFinish"],
                )
        weekly_tasks = WeeklyTask.objects.filter(created_time__date__range=[start_week, end_week])
        return [model_to_dict(task) for task in weekly_tasks]
        
    weekly_tasks = get_or_create_weekly_tasks()
    daily_tasks = get_or_create_daily_tasks(2)
    def get_daily_task_process(mission_type):
        # Get current time in UTC
        now_utc = timezone.now()
        # Convert to local time
        now_local = timezone.localtime(now_utc)
        # Get the date part
        date_today = now_local.date()
        filterd_daily_tasks = Evaluation.objects.filter(last_update_time__date=date_today, mission_type=mission_type)
        # filterd_daily_tasks = evals.filter(mission_type=mission_type).order_by('last_update_time')
        videonames = []
        for evaluation_on_date in filterd_daily_tasks:
            youtube_id = SubSubtitle.objects.get(id = evaluation_on_date.sub_subtitle_id).youtube_id
            youtube_name = Youtube.objects.get(youtube_id = youtube_id).youtube_name
            #videonames.append(youtube_name[7:][:-16])
            videonames.append(youtube_name)
        videonames = list(set(videonames))
        res = 0
        for videoname in videonames:
            # 首先根据给定的youtube_name获取对应的youtube_id
            youtube_id = Youtube.objects.get(youtube_name=videoname).youtube_id
            # 然后，根据获取的youtube_id，查找SubSubtitle对象的id
            sub_subtitle_ids = SubSubtitle.objects.filter(youtube_id=youtube_id).values_list('id', flat=True)
            # 最后，根据sub_subtitle_id过滤Evaluation对象
            filtered_evaluations = filterd_daily_tasks.filter(sub_subtitle_id__in=sub_subtitle_ids).order_by('last_update_time')
            # Convert the queryset to a list
            filtered_evaluations_list = list(filtered_evaluations)
            time_difference = timedelta()
            # Loop through the evaluations, comparing each one to the next
            for current_eval, next_eval in zip(filtered_evaluations_list, filtered_evaluations_list[1:]):
                diff = next_eval.last_update_time - current_eval.last_update_time
                if diff <= timedelta(minutes=5):
                    time_difference += diff
            res += int((time_difference + (timedelta(minutes=1) if len(filtered_evaluations_list) > 0 else timedelta(minutes=0))).total_seconds() / 60)
        return res
    new_daily_tasks = []
    for daily_task in daily_tasks:
        if daily_task["isFinish"] == True:
            daily_task["completed"] = daily_task["total"]
            new_daily_tasks.append(daily_task)
        else:
            if daily_task["task_id"] == "D001":
                durations = get_daily_task_process('Paraphrase') 
                daily_task["completed"] = durations if durations < 15 else 15
                daily_task["isFinish"] = False if durations < 15 else True
                new_daily_tasks.append(daily_task)
                if durations >= 15:
                    tempTask = DailyTask.objects.get(id = daily_task["id"])
                    tempTask.isFinish = True
                    tempTask.save()
            elif daily_task["task_id"] == "D002":
                durations = get_daily_task_process('Seque') 
                daily_task["completed"] = durations if durations < 15 else 15
                daily_task["total"] = 15
                daily_task["isFinish"] = False if durations < 15 else True
                new_daily_tasks.append(daily_task)
                if durations >= 15:
                    tempTask = DailyTask.objects.get(id = daily_task["id"])
                    tempTask.isFinish = True
                    tempTask.save()
            elif daily_task["task_id"] == "D003":
                durations = get_daily_task_process('Zh-En') 
                daily_task["completed"] = durations if durations < 15 else 15
                daily_task["total"] = 15
                daily_task["isFinish"] = False if durations < 15 else True
                new_daily_tasks.append(daily_task)
                if durations >= 15:
                    tempTask = DailyTask.objects.get(id = daily_task["id"])
                    tempTask.isFinish = True
                    tempTask.save()
            elif daily_task["task_id"] == "D004":
                durations = get_daily_task_process('Conversation') 
                daily_task["completed"] = durations if durations < 15 else 15
                daily_task["total"] = 15
                daily_task["isFinish"] = False if durations < 15 else True
                new_daily_tasks.append(daily_task)
                if durations >= 15:
                    tempTask = DailyTask.objects.get(id = daily_task["id"])
                    tempTask.isFinish = True
                    tempTask.save()
            elif daily_task["task_id"] == "D000":
                filter_tasks = Evaluation.objects.filter(last_update_time__date=timezone.localtime(timezone.now()).date())
                if len(filter_tasks) > 0:
                    daily_task["completed"] = 1
                    daily_task["isFinish"] = True
                    tempTask = DailyTask.objects.get(id = daily_task["id"])
                    tempTask.isFinish = True
                    tempTask.save()
                else:
                    daily_task["completed"] = 0
                new_daily_tasks.append(daily_task)
    new_weekly_tasks = []
    for weekly_task in weekly_tasks:
        if weekly_task["isFinish"]:
            weekly_task["completed"] = weekly_task["total"]
            new_weekly_tasks.append(weekly_task)
        else:
            start_week = timezone.localtime(timezone.now()).date() - timedelta(timezone.localtime(timezone.now()).date().weekday())
            end_week = timezone.localtime(timezone.now()).date()
            filter_daily_tasks = DailyTask.objects.filter(created_time__date__range=[start_week, end_week])
            if weekly_task["task_id"] == "W001":
                count = 0
                for task in filter_daily_tasks:
                    if task.isFinish == True:
                        count += 1
                weekly_task["completed"] = count
                if weekly_task["completed"] == weekly_task["total"]:
                    weekly_task["isFinish"] = True
                    tempTask = WeeklyTask.objects.get(id = weekly_task["id"])
                    tempTask.isFinish = True
                    tempTask.save()
            elif weekly_task["task_id"] == "W000":
                count = 0
                while start_week < end_week:
                    tempTask = filter_daily_tasks.filter(created_time__date=start_week, task_id="D000")
                    if len(tempTask) > 0 and tempTask[0].isFinish == True:
                        count += 1
                    start_week += timedelta(1)
                weekly_task["completed"] = count
                if weekly_task["completed"] == weekly_task["total"]:
                    weekly_task["isFinish"] = True
                    tempTask = WeeklyTask.objects.get(id = weekly_task["id"])
                    tempTask.isFinish = True
                    tempTask.save()
            new_weekly_tasks.append(weekly_task)
    return Response({"tasks":{"dailyTasks":new_daily_tasks, "weeklyTasks":new_weekly_tasks}}, status=200)

@api_view(['POST'])
def shut_down(request):
    os.system("shutdown /s /t 1") 



