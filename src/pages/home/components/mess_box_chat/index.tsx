import { useLoadMessBoxChatQuery } from "@/redux/api/mess.api";
import { Group, Stack, TextInput } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router";

const MessBoxChat: React.FC = () => {

    const { id } = useParams();
    const {
        data,
        refetch,
    } = useLoadMessBoxChatQuery({ id: id || "0" });

    useEffect(() => {
        refetch();
    }, [id]);

    const mess = useMemo(() => {
        return data?.data;
    }, [data]);

    console.log(mess);
    
    return (
        <Stack
            style={{
                height: "100%"
            }}
        >
            <Group>Box Name</Group>
            <Stack
                style={{
                    width: "100%",
                    flexGrow: 1
                }}
            ></Stack>
            <Group>
                <TextInput
                    placeholder="Nhập tin nhắn"
                    style={{ flexGrow: 1 }}
                />
                <IconSend2 />
            </Group>
        </Stack>
    )
}

export default MessBoxChat;