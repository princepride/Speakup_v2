from django.urls import path
from . import views

urlpatterns = [
    path('download-youtube', views.download_youtube),
    path('speech-recognition', views.speech_recognition),
    path('chatGPT', views.chatGPT),
    path('insert-sub-subtitle',views.insert_sub_subtitle),
    path('delete-sub-subtitle',views.delete_sub_subtitle),
    path('select-sub-subtitle',views.select_sub_subtitle),
    path('stream/<str:path>', views.stream_video, name='stream_video'),
]