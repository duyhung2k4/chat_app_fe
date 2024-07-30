import React, { useEffect, useMemo } from "react";
import { Group, Stack, Tabs, TextInput } from "@mantine/core";
import { useGetBoxChatQuery, useGetGroupChatQuery } from "@/redux/api/mess.api";

import { CardChat } from "./components/card";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";

import classes from "./styles.module.css";
import MessBoxChat from "./components/mess_box_chat";
import MessGroupChat from "./components/mess_group_chat";



const Home: React.FC = () => {
    const navigation = useNavigate();

    const type_mess = useMemo(() => {
        const t = window.location.pathname.split("/")?.[1];
        return t === "box" ? "box_chat" : "group_chat";
    }, [window.location.pathname]);

    const {
        data: dataBoxChat,
        refetch: refetchBoxChat,
    } = useGetBoxChatQuery(null);
    const {
        data: dataGroupChat,
        refetch: refetchGroupChat,
    } = useGetGroupChatQuery(null);

    useEffect(() => {
        refetchBoxChat();
        refetchGroupChat();
    }, []);

    return (
        <Group
            style={{
                height: "100vh",
                width: "100%",
                padding: 0,
            }}
            gap={0}
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
                    leftSection={<IconSearch />}
                />
                <Tabs
                    className={classes.tab}
                    defaultValue={type_mess}
                    onChange={e =>
                        navigation(
                            e === "box_chat" ?
                                ROUTER.BOX_CHAT.href.replace("/:id", "") :
                                ROUTER.GROUP_CHAT.href.replace("/:id", "")
                        )
                    }
                >
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
                                    <CardChat
                                        key={item.id}
                                        name={`${item.id}`}
                                        id={item.id}
                                        type="box_chat"
                                    />
                                )
                            }
                        </>
                    </Tabs.Panel>

                    <Tabs.Panel value="group_chat">
                        <>
                            {
                                (dataGroupChat?.data || []).map(item =>
                                    <CardChat
                                        key={item.id}
                                        name={`${item.id}`}
                                        id={item.id}
                                        type="group_chat"
                                    />
                                )
                            }
                        </>
                    </Tabs.Panel>
                </Tabs>
            </Stack>

            <Stack
                style={{
                    height: "100vh",
                    width: "calc(100vw - 350px)",
                    borderRight: "1px solid gray",
                    padding: 8,
                }}
            >
                {type_mess === "box_chat" ? <MessBoxChat /> : <MessGroupChat />}
            </Stack>
        </Group>
    )
}

export default Home;