from strawberry.types import Info
from . import models


def get_all_rooms(info: Info):
    return models.Room.objects.all()


def get_room(pk: int):
    try:
        return models.Room.objects.get(pk=pk)
    except models.Room.DoesNotExist:
        return None
