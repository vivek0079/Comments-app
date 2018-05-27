from rest_framework.views import APIView
from rest_framework import generics

from comments.models import Comment
from .serializers import CommentSerializer

class CommentListAPIView(generics.ListAPIView):
    serializer_class = CommentSerializer
    authentication_classes = []
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        url = self.request.GET.get("url")
        if url:
            queryset = Comment.objects.filter(url=url)
            return queryset
        return Comment.objects.none()

class CommentCreateAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        if self.request.user.is_authenticated():
            serializer.save(user=self.request.user)

