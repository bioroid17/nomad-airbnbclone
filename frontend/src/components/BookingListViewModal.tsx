import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../api";
import { IRoomBooking } from "../types";

interface BookingModalProps {
  roomPk: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingListViewModal({
  roomPk,
  isOpen,
  onClose,
}: BookingModalProps) {
  const { isLoading, data } = useQuery<IRoomBooking[]>({
    queryKey: ["bookings", roomPk],
    queryFn: getBookings,
    enabled: isOpen,
    gcTime: 0,
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Booking List</ModalHeader>
        <ModalBody>
          <Skeleton isLoaded={!isLoading} h={"100%"} w={"100%"}>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Check In</Th>
                    <Th>Check Out</Th>
                    <Th isNumeric>Guests</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data && data.length > 0 ? (
                    data?.map((booking) => (
                      <Tr key={booking.id}>
                        <Td>{booking.check_in}</Td>
                        <Td>{booking.check_out}</Td>
                        <Td isNumeric>{booking.guests}</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td>-</Td>
                      <Td>-</Td>
                      <Td isNumeric>-</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Skeleton>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
