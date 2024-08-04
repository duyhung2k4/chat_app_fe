import React, { useContext } from "react";
import classes from "./styles.module.css";
import { Avatar, Group, Stack, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { ROUTER } from "@/constants/router";
import { useAddMemberGroupChatMutation, useCreateBoxChatMutation } from "@/redux/api/mess.api";
import { useAppSelector } from "@/redux/hook";
import { useNotification } from "@/hook/notification.hook";
import { HomeContext, TypeHomeContext } from "../..";

export const CardChat: React.FC<TypeCardChat> = (props) => {
    const { id } = useParams();
    const profileId = useAppSelector(state => state.authSlice.profile?.id);

    const { refetchBoxChat, setSearch } = useContext<TypeHomeContext>(HomeContext);

    const navigation = useNavigate();
    const noti = useNotification();

    const [ createBoxChat ] = useCreateBoxChatMutation();
    const [ addMember ] = useAddMemberGroupChatMutation();



    const handleCreateBoxChat = async () => {
        if(!profileId) return;

        const result = await createBoxChat({
            profileId_1: profileId,
            profileId_2: props.id,
        });

        if("error" in result) {
            props.onError && props.onError();
            noti.error("Tạo đoạn chat thất bại");
            return;
        }

        const box_chat_id = result.data.data?.id;
        if(!box_chat_id) {
            props.onError && props.onError();
            noti.error("Tạo đoạn chat thất bại");
            return;
        }
        
        props.onSuccess && props.onSuccess();
        setSearch("");
        navigation(ROUTER.BOX_CHAT.href.replace(":id", `${box_chat_id}`));
        refetchBoxChat();
    }

    const handleAddMember = async () => {
        const result = await addMember({
            profileId: props.id,
            groupChatId: Number(id),
        });

        if("error" in result) {
            noti.error("Thêm thành viên thất bại");
            props.onError && props.onError();
            return;
        }

        if(!result.data.data) {
            noti.error("Thêm thành viên thất bại");
            props.onError && props.onError();
            return;
        }

        const box_chat_id = result.data.data.id;
        if(!box_chat_id) {
            noti.error("Thêm thành viên thất bại");
            props.onError && props.onError();
            return;
        }
        
        noti.success("Thêm thành viên thành công");
        props.onSuccess && props.onSuccess(result.data.data);
        setSearch("");
    }



    const handleClick = async () => {
        switch (props.type) {
            case "box_chat":
                navigation(ROUTER.BOX_CHAT.href.replace(":id", `${props.id}`));
                break;
            case "group_chat":
                navigation(ROUTER.GROUP_CHAT.href.replace(":id", `${props.id}`));
                break;
            case "box_chat_pending":
                await handleCreateBoxChat();
                break;
            case "group_chat_pending":
                await handleAddMember();
                break;
            default:
                break;
        }
    }

    return (
        <Group
            align="start"
            gap={8}
            mt={8}
            p={8}
            className={
                props.id === Number(id) && 
                (props.type === "box_chat" || props.type === "group_chat") 
                ? classes.card_active : classes.card}
            onClick={handleClick}
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
    onSuccess?: (result?: any) => void
    onError?: () => void
}