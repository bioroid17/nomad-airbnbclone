from django.utils import timezone
from rest_framework import serializers
from .models import Booking
from experiences.models import Experience


class CreateRoomBookingSerializer(serializers.ModelSerializer):

    check_in = serializers.DateField()
    check_out = serializers.DateField()

    class Meta:
        model = Booking
        fields = (
            "check_in",
            "check_out",
            "guests",
        )

    def validate_check_in(self, value):
        now = timezone.localtime(timezone.now()).date()
        if now > value:
            raise serializers.ValidationError("Can't book in the past!")
        else:
            return value

    def validate_check_out(self, value):
        now = timezone.localtime(timezone.now()).date()
        if now > value:
            raise serializers.ValidationError("Can't book in the past!")
        else:
            return value

    def validate(self, data):
        if data["check_out"] <= data["check_in"]:
            raise serializers.ValidationError(
                "Check in should be smaller than check out."
            )

        bookings = Booking.objects.filter(
            check_in__lte=data["check_out"],
            check_out__gte=data["check_in"],
        )
        if self.context.get("pk"):
            bookings = bookings.exclude(pk=self.context["pk"])

        if bookings.exists():
            raise serializers.ValidationError(
                "Those (or some of those) dates are already taken."
            )

        return data


class CreateExperienceBookingSerializer(serializers.ModelSerializer):

    experience_time = serializers.DateTimeField()

    class Meta:
        model = Booking
        fields = (
            "experience_time",
            "guests",
        )

    def validate_experience_time(self, value):
        now = timezone.localtime(timezone.now())
        if now > value:
            raise serializers.ValidationError("Can't book in the past!")

        experience = self.context["experience"]
        if experience.start != value.time():
            raise serializers.ValidationError("Invalid time")

        return value


class PublicBookingSerializer(serializers.ModelSerializer):

    experience_done = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = (
            "pk",
            "check_in",
            "check_out",
            "experience_time",
            "experience_done",
            "guests",
        )

    def get_experience_done(self, booking):
        if booking.experience_time:
            return booking.experience.end
        else:
            return None
