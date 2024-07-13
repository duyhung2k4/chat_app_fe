import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  Image,
  PasswordInput,
  LoadingOverlay
} from "@mantine/core";
import IconGoogle from "@/assets/icon/google-color-svgrepo-com.svg";

import { useMediaQuery } from "@mantine/hooks";
import { useGoogleLogin } from '@react-oauth/google';
import { getGoogleProfile } from "@/utils/google";
import { useLoginGoogleMutation } from "@/redux/api/auth.api";
import { LoginGoogleRequest } from "@/dto/request/auth.request";
import { useNotification } from "@/hook/notification.hook";
import { useNavigate } from "react-router";


const Login: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [_, setData] = useState<any>(null);
  const noti = useNotification();
  const navigation = useNavigate();

  const isMobile = useMediaQuery(`(max-width: ${564}px)`);
  const [login] = useLoginGoogleMutation();

  const loginGoogle = useGoogleLogin({
    onSuccess: data => {
      setAccessToken(data.access_token);
      setData(data);
    },
    onError: () => {
      setAccessToken("");
      setData(null);
    },
    flow: 'implicit',
    scope: 'profile email',
  });

  const handleLogin = async () => {
    setLoading(true);
    const result = await getGoogleProfile(accessToken);
    const res = await login(result as LoginGoogleRequest);
    setLoading(false);
    
    if ("error" in res) {
      noti.error("Đăng nhập thất bại");
      return;
    }

    noti.success("Đăng nhập thành công");
    navigation("/");
  }

  useEffect(() => {
    if (accessToken.length > 0) {
      handleLogin();
    }
  }, [accessToken]);

  return (
    <Group
      h={"100vh"}
      w={"100%"}
      align="center"
      justify="center"
      bg={"#e0e0e0"}
    >
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2, radius: "sm" }} />
      <Stack
        align="center"
        justify="center"
        p={48}
        w={isMobile ? "100%" : 400}
        h={isMobile ? "100%" : "auto"}
        style={{
          borderRadius: 8,
          backgroundColor: "#f7f7f7",
        }}
      >
        <Title>Đăng nhập</Title>
        <Text
          style={{ textAlign: "center" }}
        >Chào mừng đến với sàn thương mại điện tử của H</Text>
        <TextInput
          label="Email"
          placeholder="Nhập email"
          w={"100%"}
        />
        <PasswordInput
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          w={"100%"}
        />

        <Button
          w={"100%"}
          mt={40}
        >Đăng nhập</Button>

        <Divider
          label="Hoặc"
          color="#000"
          labelPosition="center"
          mt={14}
          mb={14}
          w={"80%"}
        />

        <Button
          w={"100%"}
          variant="outline"
          onClick={() => loginGoogle()}
          leftSection={<Image height={18} width={18} src={IconGoogle} />}
          style={{
            backgroundColor: "#fff !important",
            color: "#000",
            borderColor: "#000",
            borderWidth: 2,
          }}
        >Đăng nhập với google</Button>
      </Stack>
    </Group>
  )
}

export default Login;