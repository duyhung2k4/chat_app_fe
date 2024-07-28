import React, { useContext, useEffect, useState } from "react";
import { Box, Button, TextInput } from "@mantine/core";
import { ProtectedLayoutContext, TypeProtectedLayoutContext } from "@/layout/protected";
import { useAppSelector } from "@/redux/hook";

const Home: React.FC = () => {
    const [text, setText] = useState<string>("");
    const id = useAppSelector(state => state.authSlice.profile?.id);

    const { ws } = useContext<TypeProtectedLayoutContext>(ProtectedLayoutContext);

    const send = () => {
        const data = JSON.stringify({
            from_id: id,
            to_id: 2,
            box_chat_id: 3,
            group_chat_id: null,
            data: text
        });
        ws?.send(data);
        setText("");
    }

    useEffect(() => {
        if (!ws) return;
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
        }
    }, []);

    return (
        <Box>
            <TextInput
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button
                onClick={send}
                mt={20}
            >Send</Button>
        </Box>
    )
}

export default Home;