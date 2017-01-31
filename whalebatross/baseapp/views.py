from django.shortcuts import render
from rest_framework import viewsets
from models import Post, Category
from serializers import PostSerializer, CategorySerializer
from . import permissions

def index(request):
    return render(request, 'index.html')

class PostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAdminOrOwnerOrNoMod, permissions.IsStaffOrNoCreate]

class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IstaffOrNoMod]