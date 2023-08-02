from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
import yt_dlp
from pycaption import WebVTTReader, SRTWriter
import time
import os
from util.process_subtitle import process_subtitle
from util.api import ChatGPT
from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
import torch
import torchaudio
import math
import json
from base.models import Youtube, SubSubtitle, Record, Evaluation, Bookmark
from django.utils import timezone
import requests
from django.http import FileResponse


# 加载模型和处理器
processor = AutoProcessor.from_pretrained("openai/whisper-medium.en")
model = AutoModelForSpeechSeq2Seq.from_pretrained("openai/whisper-medium.en")
# 初始化设备
device = "cuda:0" if torch.cuda.is_available() else "cpu"
model.to(device)

with open(r'config.json') as file:
    json_data = json.load(file)

# 将模型和处理器保存为全局变量
settings.MODEL = model
settings.PROCESSOR = processor
settings.JSON_DATA = json_data

def read_file(file_path):
    # 获取脚本的父路径
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # 拼接文件的完整路径
    full_path = os.path.join(parent_dir, file_path)
    
    with open(full_path, 'r', encoding='utf-8') as file:
        file_text = file.read()
    return file_text

@api_view(['POST'])
def download_youtube(request):
    youtube_url = request.data.get('youtube_url', None)
    print(youtube_url)

    if youtube_url is None:
        return Response({"error": "URL not provided"}, status=400)
    
    if not Youtube.objects.filter(youtube_id=youtube_url[-11:]).exists():
        ydl_opts = {
            'format': 'best',
            'writesubtitles': True,
            'writeautomaticsub': True,  # Download auto-generated subtitles
            'subtitleslangs': ['en', 'zh'],  # Only download English subtitles
            'outtmpl': 'videos/%(title)s-%(id)s.%(ext)s',
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
        # Wait for the download to finish
        while not os.path.exists(subtitle_file_en) and not os.path.exists(subtitle_file_zh):
            time.sleep(1)

        if os.path.exists(subtitle_file_en):
            filename = ydl.prepare_filename(info)
            print(filename.replace('videos\\','videos/'))
            command = 'ffmpeg -i "{input_file}" -g 60 -hls_time 2 -hls_list_size 0 -hls_segment_size 500000 "{output_file}"'.format(
                input_file=filename.replace('videos\\','videos/'),
                output_file="media/" + filename[7:-4] + ".m3u8"
            )
            os.system(command)
            new_youtube_video = Youtube.objects.create(youtube_id=info['id'], youtube_name=ydl.prepare_filename(info), youtube_duration=video_duration, subtitle_name=subtitle_file_en)
            new_youtube_video.save()
            # Convert EN VTT to EN SRT
            with open(subtitle_file_en, 'r', encoding='utf-8', errors='replace') as f:
                captions = WebVTTReader().read(f.read().replace('\ufffd', ' '))

            srt_file = subtitle_file_en.replace('.vtt', '.srt')
            with open(srt_file, 'w', encoding='utf-8', errors='replace') as f:
                print(captions)
                f.write(SRTWriter().write(captions))

            os.remove(subtitle_file_en)

            process_subtitle(srt_file, srt_file.replace(".en.srt", " processed.en.srt"))

            # Delete original subtitle file
            os.remove(srt_file)

        elif os.path.exists(subtitle_file_zh):
            filename = ydl.prepare_filename(info)
            print(filename.replace('videos\\','videos/'))
            command = 'ffmpeg -i "{input_file}" -g 60 -hls_time 2 -hls_list_size 0 -hls_segment_size 500000 "{output_file}"'.format(
                input_file=filename.replace('videos\\','videos/'),
                output_file="media/" + filename[7:-4] + ".m3u8"
            )
            os.system(command)
            new_youtube_video = Youtube.objects.create(youtube_id=info['id'], youtube_name=ydl.prepare_filename(info), subtitle_name=subtitle_file_zh)
            new_youtube_video.save()
            # Convert ZH VTT to ZH SRT
            with open(subtitle_file_zh, 'r', encoding='utf-8', errors='replace') as f:
                captions = WebVTTReader().read(f.read().replace('\ufffd', ' '))

            srt_file = subtitle_file_zh.replace('.vtt', '.srt')
            with open(srt_file, 'w', encoding='utf-8', errors='replace') as f:
                print(captions)
                f.write(SRTWriter().write(captions))

            os.remove(subtitle_file_zh)

            process_subtitle(srt_file, srt_file.replace(".zh.srt", " processed.zh.srt"))

            # Delete original subtitle file
            os.remove(srt_file)
    youtube = Youtube.objects.get(youtube_id=youtube_url[-11:])
    video_url = "http://localhost:8000/stream/"+youtube.youtube_name[7:-4] + ".m3u8"
    subtitle = read_file(youtube.subtitle_name.replace(".en.vtt", " processed.en.srt").replace(".zh.vtt", " processed.zh.srt"))
    youtube_id = youtube.youtube_id
    sub_subtitle_results = SubSubtitle.objects.filter(youtube_id=youtube_id, condition=True)
    sub_subtitle_data = [{'id':sub_subtitle_result.id, 'startTime': sub_subtitle_result.start_time, 'endTime': sub_subtitle_result.end_time, 'text': sub_subtitle_result.text} for sub_subtitle_result in sub_subtitle_results]
    record_data = []
    evaluation_data = []
    for data in sub_subtitle_data:
        record_results = Record.objects.filter(sub_subtitle_id=data['id'])
        # print(record_results)
        evaluation_results = Evaluation.objects.filter(sub_subtitle_id=data['id'])
        # print(evaluation_results)
        record_data.append([{'id':record_result.id, 'text':record_result.text} for record_result in record_results])
        evaluation_data.append([{'id':evaluation_result.id, 'text':evaluation_result.text} for evaluation_result in evaluation_results])
    is_bookmark = False
    bookmark = Bookmark.objects.filter(youtube_id=youtube_id)
    if bookmark.exists():
        is_bookmark = True
    return Response({"videoUrl":video_url,"subSubtitle":sub_subtitle_data, "record":record_data, "evaluation":evaluation_data, "subtitle":subtitle, "isBookmark":is_bookmark}, status=200)

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
    waveform, sample_rate = torchaudio.load("sounds/speech_fixed.wav")
    duration = float(waveform.shape[1]) / sample_rate
    # Retrieve the model and processor from the settings
    model = settings.MODEL
    processor = settings.PROCESSOR

    # Convert the waveform to mono and normalize for processing
    waveform = waveform.mean(dim=0)
    waveform = waveform / torch.max(torch.abs(waveform))

    # Compute the number of chunks
    duration_in_seconds = waveform.shape[0] / float(sample_rate)
    chunk_length_in_seconds = 30  # the model can handle 30 seconds at a time
    num_chunks = math.ceil(duration_in_seconds / chunk_length_in_seconds)

    # Process each chunk
    transcriptions = []
    for chunk_idx in range(num_chunks):
        chunk_start = int(chunk_idx * chunk_length_in_seconds * sample_rate)
        chunk_end = int((chunk_idx + 1) * chunk_length_in_seconds * sample_rate)
        chunk_waveform = waveform[chunk_start:chunk_end]

        # Convert the audio chunk to input features
        inputs = processor(chunk_waveform.numpy(), sampling_rate=sample_rate, return_tensors="pt").to(device)
        
        # Generate the transcription for the chunk
        generated_ids = model.generate(inputs.input_features)
        transcription = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

        # Append the transcription of the chunk
        transcriptions.append(transcription)

    # Combine the transcriptions
    full_transcription = ' '.join(transcriptions)

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
    chatGPT = ChatGPT(access_tokens=settings.JSON_DATA["ACCESS_TOKENS"])
    request_type = request.data.get('request_type', None)
    id = request.data.get('id', None)
    sub_subtitle_id = request.data.get('sub_subtitle_id', None)
    mission_type = request.data.get('mission_type', None)
    prompt = request.data.get('prompt', None)
    model = request.data.get('model', None)

    result = chatGPT.talk(prompt=prompt, model=model, message_id="aaa2f50e-0bb1-4f64-94b8-d57e3fca6d25", parent_message_id="")
    # 遍历生成器并保存最后一个元素
    last_item = None
    for item in result[2]:
        last_item = item
    print(last_item)
    text = last_item['message']['content']['parts'][0]
    if request_type == 'update':
        evaluation = Evaluation.objects.get(id=id)
        evaluation.sub_subtitle_id = sub_subtitle_id
        evaluation.mission_type = mission_type
        evaluation.model = model
        evaluation.text = text
        evaluation.last_update_time = timezone.now()
        evaluation.save()
        return Response({"id": evaluation.id, "text": text}, status=200)
    elif request_type == 'insert':
        evaluation = Evaluation(sub_subtitle_id=sub_subtitle_id, mission_type=mission_type, model=model, text=text)
        evaluation.save()
        return Response({ "id": evaluation.id, "text": text}, status=200)

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
    print(sub_subtitle_id)
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
    data = [
        {
            'date': '2023-07-30',
            'totalTime': 60,
            'categories': ['paraphraseTime', 'sequeTime', 'zhEnTime', 'conversation'],
            'videos': [
                {
                    'videoname': 'video1',
                    'time': 25,
                    'data': [10, 8, 5, 2],
                },
                {
                    'videoname': 'video2',
                    'time': 35,
                    'data': [10, 5, 15, 5],
                }
            ]
        },
        {
            'date': '2023-08-31',
            'totalTime': 45,
            'categories': ['paraphraseTime', 'sequeTime', 'zhEnTime', 'conversation'],
            'videos': [
                {
                    'videoname': 'video1',
                    'time': 45,
                    'data': [40, 0, 5, 0],
                },
            ]
        }
    ]
    return Response({"data": data}, status=200)

def stream_video(request, path):
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    return FileResponse(open(file_path, 'rb'), content_type='application/x-mpegURL')


