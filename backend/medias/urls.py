from django.urls import path
from .views import PhotoDetail, VideoDetail, GetUploadURL

urlpatterns = [
    path("photos/get-url", GetUploadURL.as_view()),
    path("photos/<int:pk>", PhotoDetail.as_view()),
    path("video/<int:pk>", VideoDetail.as_view()),
]
