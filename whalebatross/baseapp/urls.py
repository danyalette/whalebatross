from django.conf.urls import url, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'posts', views.PostsViewSet)
router.register(r'categories', views.CategoriesViewSet)

urlpatterns = [
    url(r'^$', views.index),
    url(r'^api/', include(router.urls))
]
