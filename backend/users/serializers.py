from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import User


class TinyUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "name",
            "avatar",
            "username",
        )


class PrivateUserSerializer(ModelSerializer):

    class Meta:
        model = User
        exclude = (
            "password",
            "is_superuser",
            "is_active",
            "is_staff",
            "id",
            "first_name",
            "last_name",
            "groups",
            "user_permissions",
        )


class PublicUserSerializer(ModelSerializer):

    reviews_count = SerializerMethodField()
    rooms_count = SerializerMethodField()
    experiences_count = SerializerMethodField()

    class Meta:
        model = User
        exclude = (
            "password",
            "is_superuser",
            "is_active",
            "is_staff",
            "id",
            "first_name",
            "last_name",
            "groups",
            "user_permissions",
            "last_login",
            "date_joined",
        )

    def get_reviews_count(self, user):
        return user.reviews.count()

    def get_rooms_count(self, user):
        return user.rooms.count()

    def get_experiences_count(self, user):
        return user.experiences.count()
