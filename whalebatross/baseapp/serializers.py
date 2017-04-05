from rest_framework import serializers
from . import models
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
        model = models.Category
        fields = ('url', 'title', 'slug')

class PostSerializer(serializers.ModelSerializer):
    categories_ids = serializers.SlugRelatedField(
        many=True,
        slug_field='slug',
        queryset=models.Category.objects.all(),
        source='categories'
    )
    categories = CategoryShortSerializer(
        many=True,
        read_only=True
    )
    author = UserSerializer(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )
    url = serializers.HyperlinkedIdentityField(
        view_name='post-detail',
        lookup_field='slug'
    )
    class Meta:
        model = models.Post
        fields = ('url', 'title', 'slug', 'author', 'body', 'excerpt', 'status', 'allow_comments', 'categories_ids', 'categories', 'publish', 'created', 'modified', 'image')
        partial = True

class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='category-detail',
        lookup_field='slug'
    )
    posts = serializers.SlugRelatedField(many=True, slug_field='slug', queryset=models.Post.objects.all(), source='post_set')

    class Meta:
        model = models.Category
        fields = ('url', 'title', 'slug', 'posts')

class SiteSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.SiteSettings
        fields = ('title', 'logo')

