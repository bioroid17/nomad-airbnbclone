from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Booking
from .serializers import (
    BookingSerializer,
    PrivateExperienceBookingSerializer,
    PrivateRoomBookingSerializer,
)


class Bookings(APIView):
    def get(self, request):
        bookings = Booking.objects.all()
        serializer = BookingSerializer(
            bookings,
            many=True,
        )
        return Response(serializer.data)


class RoomBookings(APIView):

    def get(self, request):
        now = timezone.localtime(timezone.now()).date()
        bookings = Booking.objects.filter(
            user=request.user,
            kind=Booking.BookingKindChoices.ROOM,
            check_in__gt=now,
        ).order_by("check_in")
        serializer = PrivateRoomBookingSerializer(
            bookings,
            many=True,
        )
        return Response(serializer.data)


class ExperienceBookings(APIView):

    def get(self, request):
        now = timezone.localtime(timezone.now())
        bookings = Booking.objects.filter(
            user=request.user,
            kind=Booking.BookingKindChoices.EXPERIENCE,
            experience_time__gt=now,
        ).order_by("experience_time")
        serializer = PrivateExperienceBookingSerializer(
            bookings,
            many=True,
        )
        return Response(serializer.data)
