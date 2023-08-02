from django.urls import path
from . import views

urlpatterns = [
    path('download-youtube', views.download_youtube),
    path('speech-recognition', views.speech_recognition),
    path('chatGPT', views.chatGPT),
    path('insert-sub-subtitle',views.insert_sub_subtitle),
    path('delete-sub-subtitle',views.delete_sub_subtitle),
    path('remove_bookmark',views.remove_bookmark),
    path('add_bookmark',views.add_bookmark),
    path('select_all_bookmarks',views.select_all_bookmarks),
    path('get_statistic', views.get_statistic),
    path('stream/<str:path>', views.stream_video, name='stream_video'),
]