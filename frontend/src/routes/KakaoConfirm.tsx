import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogIn } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: kakaoLogIn,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Welcome!",
        position: "bottom-right",
        description: "Happy to have you back!",
      });
      queryClient.refetchQueries({ queryKey: ["me"] });
      navigate("/");
    },
    onError: () => {
      toast({
        status: "error",
        title: "Kakao log in failed",
        position: "bottom-right",
        description: "Couldn't log in with Kakao.",
      });
      navigate("/");
    },
  });
  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
    }
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
