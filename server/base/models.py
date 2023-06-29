from django.db import models

class Youtube(models.Model): 
    youtube_id = models.CharField(max_length=255,primary_key=True)
    youtube_name = models.CharField(max_length=255)
    subtitle_name = models.CharField(max_length=255)
    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "YouTube Video"
        verbose_name_plural = "YouTube Videos"

    def __str__(self):
        return str(self.youtube_id)+' '+str(self.youtube_name)+' '+str(self.subtitle_name)
    
class SubSubtitle(models.Model):
    youtube_id = models.CharField(max_length=255)
    start_time = models.FloatField()
    end_time = models.FloatField()
    text = models.TextField()
    condition = models.BooleanField()
    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Sub Subtitle"
        verbose_name_plural = "Sub Subtitle"

    def __str__(self):
        return str(self.youtube_id)+' '+str(self.start_time)+' '+str(self.end_time)+' '+str(self.text)+' '+str(self.condition)
    
class Record(models.Model):
    sub_subtitle_id = models.CharField(max_length=255)
    text = models.TextField()
    attempt_times = models.IntegerField()
    duration = models.FloatField()
    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Record"
        verbose_name_plural = "Record"

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
    last_update_time = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name = "Evaluation"
        verbose_name_plural = "Evaluation"

    def __str__(self):
        return str(self.sub_subtitle_id)+' '+str(self.mission_type)+' '+str(self.model)+' '+str(self.text)+' '+str(self.score)+' '+str(self.difficulty)