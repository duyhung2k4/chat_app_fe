import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import MessBoxChat from "./components/mess_box_chat";
import MessGroupChat from "./components/mess_group_chat";

import { useForm } from "@mantine/form";
import { Button, Group, LoadingOverlay, Modal, Stack, Tabs, TextInput } from "@mantine/core";
import { useCreateGroupChatMutation, useGetBoxChatQuery, useGetGroupChatQuery, useSearchProfileQuery } from "@/redux/api/mess.api";
import { CardChat } from "./components/card";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";
import { BoxChatModel } from "@/model/box_chat";
import { ProfileGroupChatModel } from "@/model/profile_group_chat";
import { useAppSelector } from "@/redux/hook";
import { useNotification } from "@/hook/notification.hook";

import classes from "./styles.module.css";
import { ProtectedLayoutContext, TypeProtectedLayoutContext } from "@/layout/protected";



const Home: React.FC = () => {
    const [modalCreateGroupChat, setModalCreateGroupChat] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const navigation = useNavigate();
    const profileId = useAppSelector(state => state.authSlice.profile?.id);
    const { ws } = useContext<TypeProtectedLayoutContext>(ProtectedLayoutContext);

    const noti = useNotification();

    const [post, { isLoading }] = useCreateGroupChatMutation();

    const formCreateGroupChat = useForm<TypeCreateGroupChat>({
        initialValues: {
            createId: 0,
            name: "",
        }
    });

    const type_mess = useMemo(() => {
        const t = window.location.pathname.split("/")?.[1];
        return t === "group" ? "group_chat" : "box_chat";
    }, [window.location.pathname]);

    const {
        data: dataBoxChat,
        refetch: refetchBoxChat,
        isFetching: fetchBoxChat,
    } = useGetBoxChatQuery(null);
    const {
        data: dataGroupChat,
        refetch: refetchGroupChat,
    } = useGetGroupChatQuery(null);
    const {
        data: dataProfile,
        refetch: refetchProfile,
    } = useSearchProfileQuery({ name: search, email: search });

    useEffect(() => {
        refetchBoxChat();
        refetchGroupChat();

        if (search.length > 0) {
            refetchProfile();
        }
    }, []);

    const { mapBoxChat, mapGroupChat } = useMemo(() => {
        let mapBoxChat: Map<number, BoxChatModel> = new Map();
        let mapGroupChat: Map<number, ProfileGroupChatModel> = new Map();

        dataBoxChat?.data?.forEach(item => {
            mapBoxChat.set(item.id, item);
        })

        dataGroupChat?.data?.forEach(item => {
            mapGroupChat.set(item.group_chat_id, item);
        })

        return {
            mapBoxChat,
            mapGroupChat
        }
    }, [dataBoxChat, dataGroupChat]);

    const handleCreateBoxChat = async (values: TypeCreateGroupChat) => {
        console.log(values);
        if(!profileId) return;

        const result = await post({
            createId: profileId,
        });

        if("error" in result) {
            noti.error("Tạo nhóm chat thất bại");
            return;
        }

        if(ws && result.data.data) {
            ws.send(JSON.stringify({
                type: "create_group_chat",
                data: {
                    id: result.data.data.id
                }
            }))
        }

        noti.success("Tạo thành công");
        setModalCreateGroupChat(false);
    }

    return (
        <HomeContext.Provider
            value={{
                mapBoxChat,
                mapGroupChat,
                search,
                refetchBoxChat,
                refetchGroupChat,
                setSearch,
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
                        maxHeight: "100vh",
                        width: "350px",
                        borderRight: "1px solid gray",
                        padding: 8,
                        position: "relative",
                        overflow: "scroll"
                    }}
                >
                    <LoadingOverlay visible={fetchBoxChat} zIndex={1000} overlayProps={{ radius: "sm", blur: 2, backgroundOpacity: 0.1 }} />
                    <TextInput
                        placeholder="Tìm kiếm"
                        leftSection={<IconSearch />}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
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
                                    search.length > 0 &&
                                    (dataProfile?.data || [])
                                        .filter(item => (dataBoxChat?.data || []).filter(b => b.from_id === item.id || b.to_id === item.id).length === 0)
                                        .map(item =>
                                            <CardChat
                                                key={item.id}
                                                name={`${item.first_name} ${item.last_name}`}
                                                id={item.id}
                                                type="box_chat_pending"
                                            />
                                        )
                                }
                                {
                                    (dataBoxChat?.data || []).map(item =>
                                        <CardChat
                                            key={item.id}
                                            name={`${profileId === item.from_id ?
                                                    `${item.to_profile?.first_name} ${item.to_profile?.last_name}` :
                                                    `${item.from_profile?.first_name} ${item.from_profile?.last_name}`
                                                }`}
                                            id={item.id}
                                            type="box_chat"
                                        />
                                    )
                                }
                            </>
                        </Tabs.Panel>

                        <Tabs.Panel value="group_chat">
                            <Button mt={16} onClick={() => setModalCreateGroupChat(true)}>Tạo nhóm chat</Button>
                            <>
                                {
                                    (dataGroupChat?.data || []).map(item =>
                                        <CardChat
                                            key={item.id}
                                            name={`${item.group_chat_id}`}
                                            id={item.group_chat_id}
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

            <Modal 
                opened={modalCreateGroupChat} 
                onClose={() => setModalCreateGroupChat(false)} 
                title="Tạo nhóm chat"
                className={classes.modal}
            >
                <form 
                    id="create-group-chat" 
                    style={{ marginTop: 16 }} 
                    onSubmit={formCreateGroupChat.onSubmit(handleCreateBoxChat)}
                >
                    <TextInput
                        label="Tên nhóm chat"
                        placeholder="Tên nhóm chat"
                        {...formCreateGroupChat.getInputProps("name")}
                    />
                </form>
                <Group justify="end" mt={16}>
                    <Button
                        loading={isLoading}
                        type="submit"
                        form="create-group-chat"
                    >Tạo</Button>
                </Group>
            </Modal>
        </HomeContext.Provider>
    )
}

export type TypeHomeContext = {
    mapBoxChat: Map<number, BoxChatModel>
    mapGroupChat: Map<number, ProfileGroupChatModel>
    search: string
    refetchBoxChat: () => void
    refetchGroupChat: () => void
    setSearch: (value: string) => void
}

export const HomeContext = createContext<TypeHomeContext>({
    mapBoxChat: new Map(),
    mapGroupChat: new Map(),
    search: "",
    refetchBoxChat: () => { },
    refetchGroupChat: () => { },
    setSearch: () => { },
})

type TypeCreateGroupChat = {
    createId: number
    name: string
}

export default Home;