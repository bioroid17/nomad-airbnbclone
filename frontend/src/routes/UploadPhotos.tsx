import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import HostOnlyPage from "../components/HostOnlyPage";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../api";

interface IForm {
  file: FileList;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();
  const { roomPk } = useParams();
  const toast = useToast();
  const createPhotoMutation = useMutation({
    mutationFn: createPhoto,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image uploaded!",
        description: "Feel free to upload more images.",
        isClosable: true,
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "I love react",
          file: `https://imagedelivery.net/ABGfCs6L1zfJXDEHYNBMsg/${result.id}/public`,
          roomPk,
        });
      }
    },
  });
  const uploadURLMutation = useMutation({
    mutationFn: getUploadURL,
    onSuccess: (data: any) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const onSubmit = (data: any) => {
    uploadURLMutation.mutate();
  };
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box
          pb={40}
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={"center"}>Upload a Photo</Heading>
            <VStack
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              spacing={5}
              mt={10}
            >
              <FormControl>
                <Input {...register("file")} type="file" accept="image/*" />
              </FormControl>
              <Button
                isLoading={
                  createPhotoMutation.isPending ||
                  uploadURLMutation.isPending ||
                  uploadImageMutation.isPending
                }
                type="submit"
                w="full"
                colorScheme={"red"}
              >
                Upload photos
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
