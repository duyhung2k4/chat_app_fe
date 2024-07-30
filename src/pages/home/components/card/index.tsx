import React from "react";
import classes from "./styles.module.css";
import { Avatar, Group, Stack, Text } from "@mantine/core";

export const CardChat: React.FC<TypeCardChat> = (props) => {
    return (
        <Group
            align="start"
            gap={8}
            mt={8}
            p={8}
            className={classes.card}
        >
            <Avatar radius="xl" size={"lg"} />
            <Stack mt={4}>
                <Text>{props.name}</Text>
            </Stack>
        </Group>
    )
}

export type TypeCardChat = {
    name: string
}