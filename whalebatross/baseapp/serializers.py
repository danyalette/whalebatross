from rest_framework import serializers
from models import Post, Category
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email')

class CategoryShortSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='category-detail',
        lookup_field='slug'
    )

    class Meta:
        model = Category
        fields = ('url', 'title')

class PostSerializer(serializers.ModelSerializer):
    categories = CategoryShortSerializer(many=True, read_only=True)
    author = UserSerializer(read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='post-detail',
        lookup_field='slug'
    )
    class Meta:
        model = Post
        fields = ('url', 'title', 'slug', 'author', 'body', 'excerpt', 'status', 'allow_comments', 'categories', 'publish', 'created', 'modified')
        partial = True

class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='category-detail',
        lookup_field='slug'
    )
    posts = PostSerializer(source='post_set', many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('url', 'title', 'slug', 'posts')
