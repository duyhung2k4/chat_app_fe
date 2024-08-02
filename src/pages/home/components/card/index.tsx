import React, { useContext } from "react";
import classes from "./styles.module.css";
import { Avatar, Group, Stack, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { ROUTER } from "@/constants/router";
import { useCreateBoxChatMutation } from "@/redux/api/mess.api";
import { useAppSelector } from "@/redux/hook";
import { useNotification } from "@/hook/notification.hook";
import { HomeContext, TypeHomeContext } from "../..";

export const CardChat: React.FC<TypeCardChat> = (props) => {
    const { id } = useParams();
    const profileId = useAppSelector(state => state.authSlice.profile?.id);

    const { refetchBoxChat, setSearch } = useContext<TypeHomeContext>(HomeContext);

    const navigation = useNavigate();
    const noti = useNotification();

    const [ post ] = useCreateBoxChatMutation();

    const handleNavigation = async () => {
        if(!profileId) return;
        if(props.type === "box_chat_pending") {
            const result = await post({
                profileId_1: profileId,
                profileId_2: props.id,
            });

            if("error" in result) {
                noti.error("Tạo đoạn chat thất bại");
                return;
            }

            const box_chat_id = result.data.data?.id;
            if(!box_chat_id) {
                noti.error("Tạo đoạn chat thất bại");
                return;
            }
            
            setSearch("");
            navigation(ROUTER.BOX_CHAT.href.replace(":id", `${box_chat_id}`));
            refetchBoxChat();

            return;
        }

        navigation(
            props.type === "box_chat" ?
                ROUTER.BOX_CHAT.href.replace(":id", `${props.id}`) :
                ROUTER.GROUP_CHAT.href.replace(":id", `${props.id}`)
        )
    }

    return (
        <Group
            align="start"
            gap={8}
            mt={8}
            p={8}
            className={props.id === Number(id) ? classes.card_active : classes.card}
            onClick={handleNavigation}
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
    type: "box_chat" | "box_chat_pending" | "group_chat" | "group_chat_pending"
}