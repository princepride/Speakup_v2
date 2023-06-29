from rest_framework import serializers
from base.models import YoutubeVideo

class YoutubeVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = YoutubeVideo
        fields = '__all__'