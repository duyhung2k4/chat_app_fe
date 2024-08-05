import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";

import { useLoadMessQuery } from "@/redux/api/mess.api";
import { useAppSelector } from "@/redux/hook";
import { Avatar, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { useParams } from "react-router";
import { ProtectedLayoutContext, TypeProtectedLayoutContext } from "@/layout/protected";
import { MessModel } from "@/model/mess";
import { HomeContext, TypeHomeContext } from "../..";
import { TYPE_MESS } from "@/model/variable";

import classes from "./styles.module.css";



const MessBoxChat: React.FC = () => {

    const messageEndRef = useRef<HTMLDivElement>(null);
    const messageListRef = useRef<HTMLDivElement>(null);

    const [text, setText] = useState<string>("");
    const [listMess, setListMess] = useState<MessModel[]>([]);

    const profileId = useAppSelector(state => state.authSlice.profile?.id);
    const { id } = useParams();

    const { ws } = useContext<TypeProtectedLayoutContext>(ProtectedLayoutContext);
    const { mapBoxChat } = useContext<TypeHomeContext>(HomeContext);

    const {
        data,
        refetch,
    } = useLoadMessQuery({ id: id || "0", type_mess: "box_chat" });
    
    const boxChat = useMemo(() => {
        return mapBoxChat.get(Number(id)) || null;
    }, [mapBoxChat, id]);

    useEffect(() => {
        refetch();
    }, [id]);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [listMess]);

    useEffect(() => {
        setListMess(data?.data || [])
    }, [data]);

    useEffect(() => {
        if(!ws || !boxChat) return;
        ws.onmessage = (e) => {
            const newMess: MessModel = JSON.parse(e.data);
            setListMess(prevListMess => [...prevListMess, newMess]);
        }
    }, [boxChat]);

    const handleSendMess = () => {
        if(
            !ws || 
            !boxChat || 
            !profileId ||
            text.length === 0
        ) return;

        const dataSend: MessModel = {
            from_id: profileId,
            to_id: profileId === boxChat.to_id ? boxChat.from_id : boxChat.to_id,
            box_chat_id: boxChat.id,
            group_chat_id: null,
            mess_rep_id: null,
            uuid: "",
            data: text,
            created_at: dayjs().toDate(),
        }

        const payload: TypePayloadOnMess = {
            type: "box_chat",
            data: dataSend,
        }

        ws?.send(JSON.stringify(payload));
        setText("");
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMess();
        }
    };
    
    return (
        <Stack
            style={{
                height: "100%",
            }}
        >
            <Group
                justify="space-between"
                style={{
                    backgroundColor: "#000",
                    padding: 8,
                }}
            >
                <Text>{
                    profileId === boxChat?.from_id ? 
                    `${boxChat?.to_profile?.first_name} ${boxChat?.to_profile?.last_name}` :
                    `${boxChat?.from_profile?.first_name} ${boxChat?.from_profile?.last_name}`
                }</Text>
                <Group>
                </Group>
            </Group>
            <Stack
                ref={messageListRef}
                style={{
                    width: "100%",
                    flexGrow: 1,
                    overflow: "scroll",
                    padding: 8,
                }}
                gap={0}
            >
                {
                    listMess?.map((item, i) =>
                        <Group
                            key={item._id}
                            justify={profileId === item.from_id ? "end" : "start"}
                            p={0}
                            gap={8}
                        >
                            {(
                                profileId === item.to_id &&
                                item.to_id !== listMess?.[i + 1]?.to_id
                            ) ? <Avatar style={{ cursor: "pointer" }}/> : <Avatar style={{ opacity: 0 }}/>}

                            <Text
                                className={profileId === item.from_id ? classes.from_mess : classes.to_mess}
                            >{item.data}</Text>
                        </Group>
                    )
                }
                <div ref={messageEndRef} />
            </Stack>
            <Group p={8}>
                <TextInput
                    placeholder="Nhập tin nhắn"
                    style={{ flexGrow: 1 }}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <IconSend2 
                    onClick={handleSendMess}
                    style={{ cursor: "pointer" }}
                />
            </Group>
        </Stack>
    )
}

export default MessBoxChat;

export type TypePayloadOnMess = {
    type: TYPE_MESS;
    data: any;
}