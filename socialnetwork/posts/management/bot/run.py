from random import randint
from uuid import uuid4

from posts.models import Post, User
from socialnetwork.settings import NUMBER_OF_USERS, MAX_POST_PER_USER, MAX_LIKES_PER_USER


class SocialNetworkBot:
    def __init__(self):
        self.number_of_users = NUMBER_OF_USERS
        self.max_post_per_user = MAX_POST_PER_USER
        self.max_likes_per_user = MAX_LIKES_PER_USER
        self.user_list = []
        self.post_list = []

    def __create_users(self):
        for _ in range(self.number_of_users):
            user_obj = User()
            user_obj.username = uuid4()
            self.user_list.append(user_obj)
            User.save(user_obj)

    def __create_posts(self):
        for user in self.user_list:
            for _ in range(self.max_post_per_user):
                post_obj = Post()
                post_obj.title = 'Test'
                post_obj.content = 'test test test'
                post_obj.author = user
                post_obj.author_name = user.username
                Post.save(post_obj)
                self.post_list.append(post_obj)

    def __like_posts(self):
        for post in self.post_list:
            for user in self.user_list:
                for _ in range(randint(0, self.max_likes_per_user)):
                    post.like(user)

    def run_bot(self):
        self.__create_users()
        self.__create_posts()
        self.__like_posts()
