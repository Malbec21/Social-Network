from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Post
from .serializers import PostSerializer


# Post ViewSet
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = PostSerializer

    def list(self, request, *args, **kwargs):
        serializer = PostSerializer(self.get_queryset(), many=True)
        self.get_serializer_class().prepare_posts_response(serializer.data, self.request.user.id)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='self')
    def get_user_posts(self, request):
        serializer = PostSerializer(request.user.posts.all(), many=True)
        self.get_serializer_class().prepare_posts_response(serializer.data, self.request.user.id)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='like')
    def like_post(self, request, pk=None):
        post = Post.objects.get(pk=pk)
        if request.user not in post.users_liked.all():
            post.like(request.user)
            return Response({"status": "liked"})
        return Response({"status": "user is already liked this post"})

    @action(detail=True, methods=['delete'], url_path='dislike')
    def dislike_post(self, request, pk=None):
        post = Post.objects.get(pk=pk)
        if request.user in post.users_liked.all():
            post.dislike(request.user)
            return Response({"status": "disliked"})
        return Response({"status": "user is already disliked this post"})

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        serializer.save(author_name=self.request.user.username)
