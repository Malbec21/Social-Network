from rest_framework import serializers

from .models import Post


# Post Serializer
class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Post
        fields = "__all__"

    @staticmethod
    def prepare_posts_response(serializer_data, user_id):
        for post in serializer_data:
            if user_id in post['users_liked']:
                post['is_liked'] = True
            else:
                post['is_liked'] = False
