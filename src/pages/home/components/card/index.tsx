import React from "react";
import classes from "./styles.module.css";
import { Avatar, Group, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";

export const CardChat: React.FC<TypeCardChat> = (props) => {
    const navigation = useNavigate();

    return (
        <Group
            align="start"
            gap={8}
            mt={8}
            p={8}
            className={classes.card}
            onClick={() =>
                navigation(
                    props.type === "box_chat" ?
                        ROUTER.BOX_CHAT.href.replace(":id", `${props.id}`) :
                        ROUTER.GROUP_CHAT.href.replace(":id", `${props.id}`)
                )
            }
        >
            <Avatar radius="xl" size={"lg"} />
            <Stack mt={4}>
                <Text>{props.name}</Text>
            </Stack>
        </Group>
    )
}

export type TypeCardChat = {
    id: number
    name: string
    type: "box_chat" | "group_chat"
}