import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import HostOnlyPage from "../components/HostOnlyPage";
import { useMutation } from "@tanstack/react-query";
import { getUploadURL } from "../api";

interface IForm {
  file: FileList;
}

export default function UploadPhotos() {
  const { register, handleSubmit } = useForm<IForm>();
  const mutation = useMutation({
    mutationFn: getUploadURL,
    onSuccess: (data: any) => {
      console.log(data);
    },
  });
  const { roomPk } = useParams();
  const onSubmit = (data: any) => {
    mutation.mutate();
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
              <Button type="submit" w="full" colorScheme={"red"}>
                Upload photos
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
