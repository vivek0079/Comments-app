from rest_framework.views import APIView
from rest_framework import generics

from comments.models import Comment
from .serializers import CommentSerializer

class CommentListAPIView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self, *args, **kwargs):
        url = self.request.GET.get("url")
        if url:
            queryset = Comment.objects.filter(url=url)
            return queryset
        return Comment.objects.none()

