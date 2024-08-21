import { Box, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={40}
      columnGap={4}
      rowGap={8}
      templateColumns={"repeat(5, 1fr)"}
    >
      <VStack alignItems={"flex-start"}>
        <Box overflow={"hidden"} mb={3} rounded={"3xl"}>
          <Image
            h={"240"}
            src="https://a0.muscache.com/im/pictures/miso/Hosting-31884678/original/bd194e6d-43af-4342-b3ae-d09088d2afbb.jpeg?im_w=720"
          />
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text as={"b"} noOfLines={1} fontSize={"md"}>
              이시레몰리노, 프랑스의 방
            </Text>
            <HStack spacing={1}>
              <FaStar size={15} />
              <Text>5.0</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={"gray.600"}>
            Seoul, S. Korea
          </Text>
        </Box>
        <Text fontSize={"sm"} color={"gray.600"}>
          <Text as={"b"}>$72</Text> / night
        </Text>
      </VStack>
    </Grid>
  );
}
