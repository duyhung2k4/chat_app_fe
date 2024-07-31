import React, { createContext, useEffect, useMemo } from "react";
import MessBoxChat from "./components/mess_box_chat";
import MessGroupChat from "./components/mess_group_chat";

import { Group, Stack, Tabs, TextInput } from "@mantine/core";
import { useGetBoxChatQuery, useGetGroupChatQuery } from "@/redux/api/mess.api";
import { CardChat } from "./components/card";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";
import { BoxChatModel } from "@/model/box_chat";
import { ProfileGroupChatModel } from "@/model/profile_group_chat";

import classes from "./styles.module.css";



const Home: React.FC = () => {
    const navigation = useNavigate();

    const type_mess = useMemo(() => {
        const t = window.location.pathname.split("/")?.[1];
        return t === "group" ? "group_chat" : "box_chat";
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

    const { mapBoxChat, mapGroupChat } = useMemo(() => {
        let mapBoxChat: Map<number, BoxChatModel> = new Map();
        let mapGroupChat: Map<number, ProfileGroupChatModel> = new Map();

        dataBoxChat?.data?.forEach(item => {
            mapBoxChat.set(item.id, item);
        })

        dataGroupChat?.data?.forEach(item => {
            mapGroupChat.set(item.id, item);
        })

        return {
            mapBoxChat,
            mapGroupChat
        }
    }, [dataBoxChat, dataGroupChat]);

    return (
        <HomeContext.Provider
            value={{
                mapBoxChat,
                mapGroupChat,
            }}
        >
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
        </HomeContext.Provider>
    )
}

export type TypeHomeContext = {
    mapBoxChat: Map<number, BoxChatModel>
    mapGroupChat: Map<number, ProfileGroupChatModel>
}

export const HomeContext = createContext<TypeHomeContext>({
    mapBoxChat: new Map(),
    mapGroupChat: new Map(),
})

export default Home;