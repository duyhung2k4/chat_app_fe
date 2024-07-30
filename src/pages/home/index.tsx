import React, { useContext, useEffect, useState } from "react";
import { Avatar, Group, Stack, Tabs, Text, TextInput } from "@mantine/core";
import { ProtectedLayoutContext, TypeProtectedLayoutContext } from "@/layout/protected";
import { useAppSelector } from "@/redux/hook";
import { useGetBoxChatQuery, useGetGroupChatQuery } from "@/redux/api/mess.api";

import classes from "./styles.module.css";
import { CardChat } from "./components/card";
import { IconSearch } from "@tabler/icons-react";

const Home: React.FC = () => {
    const [text, setText] = useState<string>("");
    const id = useAppSelector(state => state.authSlice.profile?.id);

    const { ws } = useContext<TypeProtectedLayoutContext>(ProtectedLayoutContext);

    const {
        data: dataBoxChat,
        refetch: refetchBoxChat,
    } = useGetBoxChatQuery(null);
    const {
        data: dataGroupChat,
        refetch: refetchGroupChat,
    } = useGetGroupChatQuery(null);

    // const send = () => {
    //     const data = JSON.stringify({
    //         from_id: id,
    //         to_id: null,
    //         box_chat_id: 3,
    //         group_chat_id: null,
    //         data: text
    //     });
    //     ws?.send(data);
    //     setText("");
    // }

    useEffect(() => {
        refetchBoxChat();
        refetchGroupChat();

        if (!ws) return;
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log("rep: ", data);
        }
    }, []);

    return (
        <Group
            style={{
                height: "100vh",
                width: "100%",
                padding: 0,
            }}
        >
            <Stack
                style={{
                    height: "100vh",
                    width: "350px",
                    borderRight: "1px solid gray",
                    padding: 8,
                }}
            >
                <TextInput 
                    placeholder="Tìm kiếm"
                    leftSection={<IconSearch/>}
                />
                <Tabs className={classes.tab} defaultValue="box_chat">
                    <Tabs.List>
                        <Tabs.Tab value="box_chat">
                            Đoạn chat
                        </Tabs.Tab>
                        <Tabs.Tab value="group_chat">
                            Nhóm
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="box_chat">
                        <>
                            {
                                (dataBoxChat?.data || []).map(item =>
                                    <CardChat name={`${item.id}`} />
                                )
                            }
                        </>
                    </Tabs.Panel>

                    <Tabs.Panel value="group_chat">
                        <>
                            {
                                (dataGroupChat?.data || []).map(item =>
                                    <CardChat name={`${item.id}`} />
                                )
                            }
                        </>
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Group>
    )
}

export default Home;