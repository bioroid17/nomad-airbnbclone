import {
  Button,
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
import { deleteRoom } from "../api";
import { useNavigate } from "react-router-dom";

interface RoomDeleteModalProps {
  roomPk: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomDeleteModal({
  roomPk,
  isOpen,
  onClose,
}: RoomDeleteModalProps) {
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      toast({
        title: "Room deleted!",
        status: "success",
        position: "bottom-right",
      });
      onClose();
      navigate("/");
    },
  });
  const onYesClick = () => {
    mutation.mutate(roomPk);
  };
  const onNoClick = () => {
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Room</ModalHeader>
        <ModalBody>
          <Text>Are you sure you want to delete this room?</Text>
        </ModalBody>
        <ModalFooter justifyContent={"space-evenly"}>
          <Button onClick={onYesClick} colorScheme="red">
            Yes
          </Button>
          <Button onClick={onNoClick}>No</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
