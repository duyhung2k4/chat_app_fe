import React from "react";

import { Group, Stack, TextInput } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { useParams } from "react-router";



const MessGroupChat: React.FC = () => {
    const { id } = useParams();
    
    return (
        <Stack
            style={{
                height: "100%"
            }}
        >
            <Group>Group Name {id}</Group>
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

export default MessGroupChat;