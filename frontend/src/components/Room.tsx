import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems={"flex-start"}>
      <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"3xl"}>
        <Image
          minH={"210"}
          src="https://a0.muscache.com/im/pictures/miso/Hosting-31884678/original/bd194e6d-43af-4342-b3ae-d09088d2afbb.jpeg?im_w=720"
        />
        <Button
          variant={"unstyled"}
          cursor={"pointer"}
          color={"white"}
          position={"absolute"}
          top={0}
          right={0}
        >
          <FaRegHeart size={"20px"} />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={"6fr 1fr"}>
          <Text display={"block"} as={"b"} noOfLines={1} fontSize={"md"}>
            이시레몰리노, 프랑스의 방
          </Text>
          <HStack
            _hover={{ color: "red.100" }}
            spacing={1}
            alignItems={"center"}
          >
            <FaStar size={12} />
            <Text>5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={"sm"} color={gray}>
          Seoul, S. Korea
        </Text>
      </Box>
      <Text fontSize={"sm"} color={gray}>
        <Text as={"b"}>$72</Text> / night
      </Text>
    </VStack>
  );
}
