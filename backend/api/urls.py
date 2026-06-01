from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AboutMeViewSet, CategoryViewSet, PostViewSet, send_message

router = DefaultRouter()
# basename ekleyerek Django'nun kafasının karışmasını kesin olarak engelledik:
router.register(r'aboutme', AboutMeViewSet, basename='aboutme')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'posts', PostViewSet, basename='posts')

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', send_message, name='contact'),
]