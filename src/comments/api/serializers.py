from django.contrib.staticfiles.templatetags.staticfiles import static
from django.contrib.auth import get_user_model
from rest_framework import serializers

from comments.models import Comment

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
        ]

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comment
        fields = ('id', 'image', 'user', 'url', 'content', 'timestamp', 'updated')

    def get_image(self, obj):
        return static("comments/img/user.jpeg")

class CommentUpdateSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comment
        fields = ('id', 'image', 'user', 'url', 'content', 'timestamp', 'updated')
        read_only_fields = ['url']
        
    def get_image(self, obj):
        return static("comments/img/user.jpeg")