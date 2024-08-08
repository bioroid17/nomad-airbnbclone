import strawberry
import typing
from . import types, queries


@strawberry.type
class Query:
    all_rooms: typing.List[types.RoomType] = strawberry.field(
        resolver=queries.get_all_rooms
    )
    room: typing.Optional[types.RoomType] = strawberry.field(resolver=queries.get_room)
