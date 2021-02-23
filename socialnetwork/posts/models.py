from django.contrib.auth.models import User
from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='posts_images', default='posts_images/default.png')
    like_count = models.IntegerField(default=0)
    users_liked = models.ManyToManyField(User, blank=True)
    author = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE, null=True)
    author_name = models.CharField(max_length=150, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def like(self, user):
        self.like_count += 1
        self.users_liked.add(user)
        self.save()

    def dislike(self, user):
        self.like_count -= 1
        self.users_liked.remove(user)
        self.save()
