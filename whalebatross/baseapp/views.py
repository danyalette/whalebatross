from django.shortcuts import render
from rest_framework import viewsets
from models import Post, Category
from serializers import PostSerializer, CategorySerializer

def index(request):
    return render(request, 'index.html')

class PostsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

class CategoriesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'