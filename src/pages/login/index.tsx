import React from "react";
import {
    Button,
    Grid,
    Group,
    MantineProvider,
    PasswordInput,
    Stack,
    Text,
    TextInput
} from "@mantine/core";

import loginTheme from "./theme";

import { useForm } from "@mantine/form";
import { useLoginMutation } from "@/redux/api/auth.api";
import { useNotification } from "@/hook/notification.hook";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";



const Register: React.FC = () => {
    const [post, { isLoading } ] = useLoginMutation();
    const noti =  useNotification();
    const navigation = useNavigate();

    const form = useForm<FormLogin>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email không hợp lệ'),
            password: (value) => value.length <= 6 ? "Mật khẩu quá ngắn" : null,
        }
    })

    const handleRegsiter = async (values: FormLogin) => {
        const result = await post(values);
        
        if("error" in result) {
            noti.error("Đăng nhập thất bại");
            return;
        }

        navigation(ROUTER.HOME.href);
    }

    return (
        <MantineProvider theme={loginTheme}>
            <Group
                style={{
                    backgroundColor: "#323232",
                    height: "100vh",
                    width: "100vw",
                }}
                align="center"
                justify="center"
            >
                <Group
                    style={{
                        height: "90%",
                        backgroundColor: "#131313",
                        padding: "32px 50px",
                        color: "#FFF",
                        borderRadius: 20
                    }}
                    align="center"
                    justify="center"
                >
                    <Stack
                        style={{
                            width: 400
                        }}
                    >
                        <Stack>
                            <Text
                                style={{
                                    color: "#414141",
                                    fontWeight: 600,
                                    textTransform: "uppercase"
                                }}
                            >Đăng nhập</Text>
                            <Text
                                style={{
                                    fontSize: 30
                                }}
                            >Chào mừng bạn quay lại</Text>
                            <Text
                                style={{}}
                            >
                                Bạn chưa có tài khoản?&nbsp;
                                <span
                                    style={{
                                        color: "#B54D32",
                                        cursor: "pointer",
                                        fontWeight: 600
                                    }}
                                    onClick={() => navigation(ROUTER.REGISTER.href)}
                                >Đăng kí</span>
                            </Text>
                        </Stack>

                        <form id="register" onSubmit={form.onSubmit(handleRegsiter)}>
                            <Grid>
                                <Grid.Col span={12}>
                                    <TextInput
                                        label="Email"
                                        {...form.getInputProps("email")}
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <PasswordInput
                                        label="Mật khẩu"
                                        {...form.getInputProps("password")}
                                    />
                                </Grid.Col>
                            </Grid>
                        </form>

                        <Button
                            loading={isLoading}
                            type="submit"
                            form="register"
                            style={{
                                marginTop: 20,
                                borderRadius: 1000,
                                padding: "0px 30px"
                            }}
                        >Đăng nhập</Button>
                    </Stack>
                </Group>
            </Group>
        </MantineProvider>
    )
}

type FormLogin = {
    email: string
    password: string
}

export default Register;