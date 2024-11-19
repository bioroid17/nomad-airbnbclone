from rest_framework import serializers
from .models import Perk, Experience
from users.serializers import TinyUserSerializer
from categories.serializers import CategorySerializer
from medias.serializers import PhotoSerializer, VideoSerializer
from wishlists.models import Wishlist


class PerkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perk
        fields = (
            "name",
            "detail",
            "explanation",
        )


class ExperienceDetailSerializer(serializers.ModelSerializer):

    host = TinyUserSerializer(
        read_only=True,
    )
    perks = PerkSerializer(
        read_only=True,
        many=True,
    )
    category = CategorySerializer(
        read_only=True,
    )
    is_host = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    photos = PhotoSerializer(
        many=True,
        read_only=True,
    )
    video = VideoSerializer(
        read_only=True,
    )

    class Meta:
        model = Experience
        fields = "__all__"

    def get_is_host(self, experience):
        request = self.context["request"]
        return experience.host == request.user

    def get_is_liked(self, experience):
        request = self.context["request"]
        return Wishlist.objects.filter(
            user=request.user,
            experiences__pk=experience.pk,
        ).exists()


class ExperienceListSerializer(serializers.ModelSerializer):

    is_host = serializers.SerializerMethodField()
    photos = PhotoSerializer(
        many=True,
        read_only=True,
    )
    video = VideoSerializer(
        read_only=True,
    )

    class Meta:
        model = Experience
        fields = (
            "pk",
            "name",
            "country",
            "city",
            "price",
            "is_host",
            "photos",
            "video",
        )

    def get_is_host(self, experience):
        request = self.context["request"]
        return experience.host == request.user


class SmallExperienceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Experience
        fields = (
            "pk",
            "name",
        )
