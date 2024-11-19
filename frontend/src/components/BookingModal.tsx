import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../api";
import type { Value } from "react-calendar/dist/cjs/shared/types";
import { formatDate } from "../lib/utils";
import { FaCalendar, FaUserClock } from "react-icons/fa";
import useUser from "../lib/userUser";

interface BookingModalProps {
  roomPk: string;
  dates: Value | undefined;
  guests: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({
  roomPk,
  dates,
  guests,
  isOpen,
  onClose,
}: BookingModalProps) {
  const { isLoggedIn } = useUser();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast({
        title: "Booking successful",
        status: "success",
        position: "bottom-right",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Unknown error occurred",
        status: "error",
        position: "bottom-right",
      });
    },
  });
  const onNoClick = () => {
    onClose();
  };
  if (!dates) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>Dates undefined</ModalHeader>
          <ModalBody>Please select check in, check out date first.</ModalBody>
          <ModalFooter>
            <Button onClick={onNoClick}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  const [startDate, endDate] = dates.toLocaleString().split(",");
  const check_in = formatDate(startDate);
  const check_out = formatDate(endDate);
  const onYesClick = () => {
    if (!guests) guests = 1;
    mutation.mutate({ check_in, check_out, roomPk, guests });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Booking Room</ModalHeader>
        <ModalBody>
          <Text>Are you sure you want to book this room at chosen date?</Text>
          <HStack>
            <FaCalendar />
            <Text>From: {check_in}</Text>
          </HStack>
          <HStack>
            <FaCalendar />
            <Text>To: {check_out}</Text>
          </HStack>
          <HStack>
            <FaUserClock />
            <Text>Guests: {guests ? guests : 1}</Text>
          </HStack>
        </ModalBody>
        <ModalFooter justifyContent={"space-evenly"}>
          <Button disabled={!isLoggedIn} onClick={onYesClick} colorScheme="red">
            Yes
          </Button>
          <Button onClick={onNoClick}>No</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
