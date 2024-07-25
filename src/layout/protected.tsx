import React, { createContext, Suspense, useEffect, useMemo } from "react";

import { LoadingOverlay } from "@mantine/core";
import { useNavigate, useOutlet } from "react-router-dom";
import { useRefreshTokenMutation } from "@/redux/api/auth.api";
import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { TYPE_TOKEN } from "@/constants/token";
import { ROUTER } from "@/constants/router";

const ProtectedLayout: React.FC = () => {
    const outlet = useOutlet();
    const navigation = useNavigate();
    const profileId = useAppSelector(state => state.authSlice.profile?.id);
    
    const [post, { isLoading }] = useRefreshTokenMutation();

    const ws = useMemo(() => {
        if(!profileId) return null;
        const params = new URLSearchParams({ id: `${profileId || ""}` });
        const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}?${params}`);

        return ws;
    }, [profileId]);
    
    useEffect(() => {
        post(null);
    }, []);

    if(!Cookies.get(TYPE_TOKEN.ACCESS_TOKEN)) {
        navigation(ROUTER.LOGIN.href);
        return;
    };

    if(isLoading) return <LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />;


    return (
        <ProtectedLayoutContext.Provider value={{ ws }}>
            <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
                {outlet}
            </Suspense>
        </ProtectedLayoutContext.Provider>
    )
}

export type TypeProtectedLayoutContext = {
    ws: WebSocket | null;
}

export const ProtectedLayoutContext = createContext<TypeProtectedLayoutContext>({
    ws: null
});

export default ProtectedLayout;