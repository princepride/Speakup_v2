from django.http import FileResponse
import os
from django.conf import settings

def stream_video(request, path):
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    return FileResponse(open(file_path, 'rb'), content_type='application/x-mpegURL')