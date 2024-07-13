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
import { useForm } from "@mantine/form";
import regsiterTheme from "./theme";
import { useRegisterMutation } from "@/redux/api/auth.api";


const Register: React.FC = () => {

    const [post, { isLoading } ] = useRegisterMutation();

    const form = useForm<FormRegister>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email không hợp lệ'),
            firstName: (value) => value.length <= 2 ? "Họ quá ngắn" : null,
            lastName: (value) => value.length <= 2 ? "Tên quá ngắn" : null,
            password: (value) => value.length <= 6 ? "Mật khẩu quá ngắn" : null,
            repeatPassword: (value, formData) => value.length <= 6 ? "Mật khẩu quá ngắn" : (formData.password !== value ? "Mật khẩu trông trùng khớp" : null),
        }
    })

    const handleRegsiter = async (values: FormRegister) => {
        const result = await post(values);
        console.log(result);
    }

    return (
        <MantineProvider theme={regsiterTheme}>
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
                            >Đăng kí miến phí</Text>
                            <Text
                                style={{
                                    fontSize: 30
                                }}
                            >Tạo tài khoản của bạn</Text>
                            <Text
                                style={{}}
                            >
                                Bạn đã có tài khoản?&nbsp;
                                <span
                                    style={{
                                        color: "#B54D32",
                                        cursor: "pointer",
                                        fontWeight: 600
                                    }}
                                >Đăng nhập</span>
                            </Text>
                        </Stack>

                        <form id="register" onSubmit={form.onSubmit(handleRegsiter)}>
                            <Grid>
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="Họ"
                                        {...form.getInputProps("firstName")}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="Tên"
                                        {...form.getInputProps("lastName")}
                                    />
                                </Grid.Col>
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
                                <Grid.Col span={12}>
                                    <PasswordInput
                                        label="Nhắc lại mật khẩu"
                                        {...form.getInputProps("repeatPassword")}
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
                        >Đăng kí</Button>
                    </Stack>
                </Group>
            </Group>
        </MantineProvider>
    )
}

type FormRegister = {
    firstName: string
    lastName: string
    email: string
    password: string
    repeatPassword: string
}

export default Register;