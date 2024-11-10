import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { useQuery } from "@tanstack/react-query";
import { IReview, IRoomDetail } from "../types";
import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import type { Value } from "react-calendar/dist/cjs/shared/types";
import { useEffect, useState } from "react";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>({
    queryKey: [`rooms`, roomPk],
    queryFn: getRoom,
  });
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >({
    queryKey: [`rooms`, roomPk, `reviews`],
    queryFn: getRoomReviews,
  });
  const [dates, setDates] = useState<Value>();
  useEffect(() => {
    if (dates) {
      const [startDate, endDate] = dates.toLocaleString().split(",");
      const checkIn = startDate
        .split(".")
        .filter((value, index) => index !== 3)
        .map((s) => {
          return s.trim();
        })
        .join("-");
      const checkOut = endDate
        .split(".")
        .filter((value, index) => index !== 3)
        .map((s) => {
          return s.trim();
        })
        .join("-");
      console.log(checkIn, checkOut);
    }
  });
  return (
    <Box mt={10} px={{ base: 10, lg: 40 }}>
      <Skeleton height={"43px"} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={5}
        rounded={"xl"}
        overflow={"hidden"}
        gap={3}
        height={"60vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h={"100%"} w={"100%"}>
              {data?.photos &&
              data?.photos[index] &&
              data?.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w={"100%"}
                  h={"100%"}
                  src={data?.photos[index].file}
                />
              ) : (
                <Box minH="280px" h="100%" w="100%" p={10} bg="green.400" />
              )}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={20} templateColumns={"2fr 1fr"} maxW="container.lg">
        <Box>
          <HStack width={"60%"} mt={10} justifyContent={"space-between"}>
            <VStack w={"max"} alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading}>
                <Heading fontSize={"2xl"}>
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <HStack justifyContent={"flex-start"} w={"100%"}>
                  <Text>
                    {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>•</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              name={data?.owner.name}
              size={"xl"}
              src={data?.owner.avatar}
            />
          </HStack>
          <Box mt={10}>
            <Heading w={"50%"} mb={5} fontSize={"2xl"}>
              <Skeleton isLoaded={!isReviewsLoading}>
                <HStack>
                  <FaStar /> <Text>{data?.rating}</Text>
                  <Text>•</Text>
                  <Text>
                    {reviewsData?.length} review
                    {reviewsData?.length === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX={"none"}>
              <Skeleton h={"30vh"} isLoaded={!isReviewsLoading}>
                <Grid gap={10} templateColumns={"1fr 1fr"}>
                  {reviewsData?.map((review, index) => (
                    <VStack alignItems={"flex-start"} key={index}>
                      <HStack>
                        <Avatar
                          name={review.user.name}
                          src={review.user.avatar}
                          size={"md"}
                        />
                        <VStack spacing={0} alignItems={"flex-start"}>
                          <Heading fontSize={"md"}>{review.user.name}</Heading>
                          <HStack spacing={1}>
                            <FaStar size={"12px"} />
                            <Text>{review.rating}</Text>
                          </HStack>
                        </VStack>
                      </HStack>
                      <Text>{review.payload}</Text>
                    </VStack>
                  ))}
                </Grid>
              </Skeleton>
            </Container>
          </Box>
        </Box>
        <Box pt={10}>
          <Calendar
            onChange={setDates}
            selectRange
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            minDetail="month"
            prev2Label={null}
            next2Label={null}
          />
        </Box>
      </Grid>
    </Box>
  );
}
