import { useQuery } from "@tanstack/react-query";
import ProtectedPage from "../components/ProtectedPage";
import { getUserExperienceBookings, getUserRoomBookings } from "../api";
import {
  Box,
  Grid,
  Heading,
  Skeleton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IUserExperienceBooking, IUserRoomBooking } from "../types";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function UserBookings() {
  const { isLoading: isRoomLoading, data: roomBookings } = useQuery<
    IUserRoomBooking[]
  >({
    queryKey: ["bookings", "rooms"],
    queryFn: getUserRoomBookings,
  });
  const { isLoading: isExperienceLoading, data: experienceBookings } = useQuery<
    IUserExperienceBooking[]
  >({
    queryKey: ["bookings", "experiences"],
    queryFn: getUserExperienceBookings,
  });
  return (
    <ProtectedPage>
      <Helmet>
        <title>My Booking Lists</title>
      </Helmet>
      <Box mx={20} my={10}>
        <Heading>My Booking Lists</Heading>
        <Grid templateColumns={"1fr 1fr"} gap={10}>
          <Skeleton isLoaded={!isRoomLoading}>
            <TableContainer>
              <Table colorScheme="green" variant="striped" size={"sm"}>
                <TableCaption fontSize="lg" placement="top">
                  Room Bookings
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Room Name</Th>
                    <Th>Check In</Th>
                    <Th>Check Out</Th>
                    <Th isNumeric>Guests</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {roomBookings && roomBookings.length > 0 ? (
                    roomBookings?.map((booking) => (
                      <Tr key={booking.id}>
                        <Td>
                          <Link to={`/rooms/${booking.room.pk}`}>
                            {booking.room.name}
                          </Link>
                        </Td>
                        <Td>{booking.check_in}</Td>
                        <Td>{booking.check_out}</Td>
                        <Td isNumeric>{booking.guests}</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td>-</Td>
                      <Td>-</Td>
                      <Td>-</Td>
                      <Td isNumeric>-</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Skeleton>
          <Skeleton isLoaded={!isExperienceLoading}>
            <TableContainer>
              <Table colorScheme="blue" variant="striped" size={"sm"}>
                <TableCaption fontSize="lg" placement="top">
                  Experience Bookings
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Experience Name</Th>
                    <Th>Experience Time</Th>
                    <Th>Experience Done</Th>
                    <Th isNumeric>Guests</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {experienceBookings && experienceBookings.length > 0 ? (
                    experienceBookings?.map((booking) => (
                      <Tr key={booking.id}>
                        <Td>
                          {/* <Link to={`/experiences/${booking.experience.pk}`}> */}
                          {booking.experience.name}
                          {/* </Link> */}
                        </Td>
                        <Td>
                          {booking.experience_time
                            ?.slice(0, -6)
                            .replace("T", " ")}
                        </Td>
                        <Td>{booking.experience_done}</Td>
                        <Td isNumeric>{booking.guests}</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td>-</Td>
                      <Td>-</Td>
                      <Td>-</Td>
                      <Td isNumeric>-</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Skeleton>
        </Grid>
      </Box>
    </ProtectedPage>
  );
}
