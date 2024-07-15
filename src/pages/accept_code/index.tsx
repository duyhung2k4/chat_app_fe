import React, { useEffect, useState } from "react";
import acceptCodeTheme from "./theme";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Button, Group, LoadingOverlay, MantineProvider, PasswordInput, Stack, Text } from "@mantine/core";
import { useAcceptCodeMutation, useGetTimeCodePendingQuery, useRepeatCodeMutation } from "@/redux/api/auth.api";
import { TOKEN_TYPE } from "@/model/variable";
import { useNotification } from "@/hook/notification.hook";

dayjs.extend(relativeTime);

const AcceptCode: React.FC = () => {
    const [code, setCode] = useState<string>("");
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

    const noti = useNotification();

    const {
        data,
        isLoading,
        refetch,
    } = useGetTimeCodePendingQuery({ email: Cookies.get(TOKEN_TYPE.INFO_REPEAT_CODE) || "" });

    const [acceptCode, { isLoading: loadingAcceptCode }] = useAcceptCodeMutation();
    const [repeatCode, { isLoading: loadingRepeatCode }] = useRepeatCodeMutation();



    const handleAccept = async () => {
        const result = await acceptCode({
            email: Cookies.get(TOKEN_TYPE.INFO_REPEAT_CODE) || "",
            code,
        });

        if ("error" in result) {
            noti.error("Mã xác nhận sai");
            return;
        }
    }

    const handleRepeat = async () => {
        if(Cookies.get(TOKEN_TYPE.INFO_REPEAT_CODE) === undefined) {
            noti.error("Hết phiên đăng kí");
            return;
        }
        const result = await repeatCode({
            email: Cookies.get(TOKEN_TYPE.INFO_REPEAT_CODE) || "",
        });

        if ("error" in result) {
            noti.error("Gửi lại mã thất bạn");
            return;
        }
        
        refetch();
        Cookies.set(TOKEN_TYPE.INFO_REPEAT_CODE, Cookies.get(TOKEN_TYPE.INFO_REPEAT_CODE) || "", { expires: dayjs().add(60, "second").toDate() });
    }



    useEffect(() => {
        if (data?.data?.dataTime === undefined) {
            return
        };
        const countTime = dayjs(data.data.dataTime).diff(dayjs(), "second");
        setTimeRemaining(countTime);
    }, [data]);

    useEffect(() => {
        if (timeRemaining === null || timeRemaining <= 0) return;
        const countHandle = setTimeout(() => {
            setTimeRemaining(timeRemaining - 1);
        }, 1000);

        return () => {
            clearTimeout(countHandle);
        }
    }, [timeRemaining]);

    useEffect(() => {
        refetch();
    }, []);

    if (isLoading) {
        return <LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />
    }

    return (
        <MantineProvider theme={acceptCodeTheme}>
            <Group
                style={{
                    backgroundColor: "#323232",
                    height: "100vh",
                    width: "100vw",
                }}
                align="start"
                justify="center"
            >
                <Group
                    style={{
                        backgroundColor: "#131313",
                        padding: "32px 50px",
                        color: "#FFF",
                        borderRadius: 20,
                        marginTop: 120,
                    }}
                    align="center"
                    justify="center"
                >
                    <Stack
                        style={{
                            width: 300
                        }}
                        align="center"
                    >
                        <Text>Nhập mã xác nhận</Text>
                        <Text
                            style={{
                                color: "red"
                            }}
                        >
                            {
                                timeRemaining !== null && timeRemaining > 0
                                ? <span>Mã xác nhận hết hạn sau <span style={{ color: "#FFF" }}>{timeRemaining}</span> giây</span>
                                : <span>Mã xác nhận hết hạn</span>
                            }
                        </Text>
                        <PasswordInput
                            value={code}
                            maxLength={6}
                            style={{
                                width: "100%",
                                textAlign: "center"
                            }}
                            onChange={e => setCode(e.target.value)}
                        />

                        <Button
                            loading={loadingAcceptCode || loadingRepeatCode}
                            disabled={timeRemaining !== null && timeRemaining > 0 ? code.length != 6 : false}
                            type="submit"
                            form="register"
                            onClick={
                                timeRemaining !== null && timeRemaining > 0
                                    ? handleAccept
                                    : handleRepeat
                            }
                            style={{
                                marginTop: 20,
                                borderRadius: 1000,
                                padding: "0px 30px",
                                width: "100%",
                            }}
                        >
                            {
                                timeRemaining !== null && timeRemaining > 0
                                    ? "Xác nhận"
                                    : "Gửi lại mã"
                            }
                        </Button>
                    </Stack>
                </Group>
            </Group>
        </MantineProvider>
    )
}

export default AcceptCode;