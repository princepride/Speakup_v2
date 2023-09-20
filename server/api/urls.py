from django.urls import path
from . import views
from django.views.generic import TemplateView

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
    path('get_tasks', views.get_tasks),
    path('shut_down', views.shut_down),
    path('', TemplateView.as_view(template_name='/frontend/index.html')),
]