from django.db import models

class Youtube(models.Model): 
    youtube_id = models.CharField(max_length=255,primary_key=True)
    youtube_name = models.CharField(max_length=255)
    youtube_duration = models.IntegerField()
    subtitle_name = models.CharField(max_length=255)
    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "YouTube Video"
        verbose_name_plural = "YouTube Videos"

    def __str__(self):
        return str(self.youtube_id)+' '+str(self.youtube_name)+' '+str(self.youtube_duration)+' '+str(self.subtitle_name)
    
class SubSubtitle(models.Model):
    youtube_id = models.CharField(max_length=255)
    start_time = models.FloatField()
    end_time = models.FloatField()
    text = models.TextField()
    condition = models.BooleanField()
    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Sub Subtitle"
        verbose_name_plural = "Sub Subtitles"

    def __str__(self):
        return str(self.youtube_id)+' '+str(self.start_time)+' '+str(self.end_time)+' '+str(self.text)+' '+str(self.condition)
    
class Record(models.Model):
    sub_subtitle_id = models.CharField(max_length=255)
    text = models.TextField()
    attempt_times = models.IntegerField()
    duration = models.FloatField()
    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Record"
        verbose_name_plural = "Records"

    def __str__(self):
        return str(self.sub_subtitle_id)+' '+str(self.text)+' '+str(self.attempt_times)+' '+str(self.duration)
    
class Evaluation(models.Model):
    sub_subtitle_id = models.CharField(max_length=255)
    mission_type = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    text = models.TextField()
    score = models.FloatField(null=True)
    difficulty = models.FloatField(null=True)
    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name = "Evaluation"
        verbose_name_plural = "Evaluations"

    def __str__(self):
        return str(self.sub_subtitle_id)+' '+str(self.mission_type)+' '+str(self.model)+' '+str(self.text)+' '+str(self.score)+' '+str(self.difficulty)
    
class Bookmark(models.Model):
    youtube_id = models.CharField(max_length=255)
    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Bookmark"
        verbose_name_plural = "Bookmarks"

    def __str__(self):
        return str(self.youtube_id)
    

class DailyTask(models.Model):
    task_id = models.CharField(max_length=10)
    name_en = models.CharField(max_length=255)
    name_zh = models.CharField(max_length=255)
    description_en = models.TextField()
    description_zh = models.TextField()
    exp = models.IntegerField()
    total = models.IntegerField()
    isFinish = models.BooleanField()
    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Daily Task"
        verbose_name_plural = "Daily Tasks"

    def __str__(self):
        return str(self.task_id) + ' ' + self.name_en + ' ' + self.name_zh + ' ' + self.description_en + ' ' + self.description_zh + ' ' + str(self.exp)
    
class WeeklyTask(models.Model):
    task_id = models.CharField(max_length=10)
    name_en = models.CharField(max_length=255)
    name_zh = models.CharField(max_length=255)
    description_en = models.TextField()
    description_zh = models.TextField()
    exp = models.IntegerField()
    total = models.IntegerField()
    isFinish = models.BooleanField()
    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Weekly Task"
        verbose_name_plural = "Weekly Tasks"

    def __str__(self):
        return str(self.task_id) + ' ' + self.name_en + ' ' + self.name_zh + ' ' + self.description_en + ' ' + self.description_zh + ' ' + str(self.exp)