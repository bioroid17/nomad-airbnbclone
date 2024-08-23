import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { useQuery } from "@tanstack/react-query";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: [`rooms`, roomPk],
    queryFn: getRoom,
  });
  console.log(data);

  return <h1>hello</h1>;
}
