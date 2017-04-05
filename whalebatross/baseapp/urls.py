from django.conf.urls import url, include
from . import views
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r'posts', views.PostsViewSet)
router.register(r'categories', views.CategoriesViewSet)
router.register(r'settings', views.SettingsViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api/user/current/$',
        views.CurrentUserView.as_view(),
        name='current_user'),
    url(r'^auth/$',
        views.AuthView.as_view(),
        name='authenticate'),
    url(r'^$', views.index),
    url(r'^posts/', views.index),
    url(r'^page/', views.index)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns.append(url(r'^404/', views.index))
    # for urls not starting with 'api',
    # if the url doesn't match any of the other routes,
    # render react app rather than 404
    urlpatterns.append(url(r'^(?!api)(?!admin).+', views.index))
