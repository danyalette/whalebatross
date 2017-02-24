from django.shortcuts import render
from rest_framework import viewsets, views, status
from django.middleware import csrf
from django.contrib.auth import login, logout

from . import permissions, authentication, serializers, models

def index(request):
    return render(request, 'index.html')

class PostsViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAdminOrOwnerOrNoMod, permissions.IsStaffOrNoCreate]

class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IstaffOrNoMod]


class AuthView(views.APIView):
    authentication_classes = (authentication.QuietBasicAuthentication,)

    def post(self, request, *args, **kwargs):
        login(request, request.user)
        user_data = serializers.UserSerializer(request.user).data
        user_data["csrftoken"] = csrf.get_token(request)
        return views.Response(user_data)

    def delete(self, request, *args, **kwargs):
        logout(request)
        return views.Response(status=200)

class CurrentUserView(views.APIView):
    def get(self, request):
        if not request.user.is_authenticated():
            return views.Response(status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.UserSerializer(request.user)
        return views.Response(serializer.data)