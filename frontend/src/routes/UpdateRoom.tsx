import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAmenities,
  getCategories,
  getRoom,
  IUploadRoomVariables,
  updateRoom,
} from "../api";
import { IAmenity, ICategory, IRoomDetail } from "../types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function UpdateRoom() {
  const { roomPk } = useParams();
  const { data } = useQuery<IRoomDetail>({
    queryKey: [`rooms`, roomPk],
    queryFn: getRoom,
  });
  const { data: amenities } = useQuery<IAmenity[]>({
    queryKey: ["amenities"],
    queryFn: getAmenities,
  });
  const { data: categories } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { register, handleSubmit, setValue } = useForm<IUploadRoomVariables>();
  if (data) {
    // console.log(data.pet_friendly);
    setValue("name", data?.name);
    setValue("country", data?.country);
    setValue("city", data?.city);
    setValue("address", data?.address);
    setValue("price", data?.price);
    setValue("rooms", data?.rooms);
    setValue("toilets", data?.toilets);
    setValue("description", data?.description);
    setValue("pet_friendly", data?.pet_friendly);
    setValue("kind", data?.kind);
    setValue("category", data?.category.pk);
  }
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updateRoom,
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: "success",
        title: "Room updated",
        position: "bottom-right",
      });
      navigate(`/rooms/${roomPk}`);
    },
  });
  const onSubmit = (data: IUploadRoomVariables) => {
    if (roomPk) {
      mutation.mutate({ variables: data, roomPk });
    }
  };
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Helmet>
            <title>Upload Room</title>
          </Helmet>
          <Container>
            <Heading textAlign={"center"}>Update Room</Heading>
            <VStack
              spacing={10}
              as="form"
              mt={5}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name", { required: true })}
                  required
                  type="text"
                />
                <FormHelperText>Write the name of your room.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  {...register("country", {
                    required: true,
                  })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  {...register("city", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  {...register("address", {
                    required: true,
                  })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaMoneyBill />} />
                  <Input
                    {...register("price", {
                      required: true,
                    })}
                    required
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input
                    {...register("rooms", {
                      required: true,
                    })}
                    required
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input
                    {...register("toilets", {
                      required: true,
                    })}
                    required
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description", {
                    required: true,
                  })}
                />
              </FormControl>
              <FormControl>
                <Checkbox
                  defaultChecked={data?.pet_friendly}
                  {...register("pet_friendly", {
                    required: true,
                  })}
                >
                  Pet friendly?
                </Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>Kind of room</FormLabel>
                <Select
                  {...register("kind", { required: true })}
                  placeholder="Choose a kind"
                >
                  <option value="entire_place">Entire Place</option>
                  <option value="private_room">Private Room</option>
                  <option value="shared_room">Shared Room</option>
                </Select>
                <FormHelperText>
                  What kind of room are you renting?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register("category", {
                    required: true,
                  })}
                  placeholder="Choose a category"
                >
                  {categories?.map((category) => (
                    <option key={category.pk} value={category.pk}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  What category describes your room?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Amenities</FormLabel>
                <Grid templateColumns={"1fr 1fr"} gap={5}>
                  {amenities?.map((amenity) => (
                    <Box key={amenity.pk}>
                      <Checkbox
                        value={amenity.pk}
                        /* some: 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트합니다. 만약 배열에서 주어진 함수가 true을 반환하면 true를 반환합니다. 그렇지 않으면 false를 반환합니다. 이 메서드는 배열을 변경하지 않습니다. */
                        defaultChecked={data?.amenities.some(
                          (a) => amenity.pk === a.pk
                        )}
                        {...register("amenities", { required: true })}
                      >
                        {amenity.name}
                      </Checkbox>
                      <FormHelperText>{amenity.description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </FormControl>
              {mutation.isError ? (
                <Text color="red.500">Something went wrong</Text>
              ) : null}
              <Button
                type="submit"
                isLoading={mutation.isPending}
                colorScheme={"red"}
                size={"lg"}
                w={"100%"}
              >
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
