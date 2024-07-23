import React, { createContext, Suspense, useMemo } from "react";

import { LoadingOverlay } from "@mantine/core";
import { useOutlet } from "react-router-dom";

const ProtectedLayout: React.FC = () => {
    const outlet = useOutlet();

    const ws = useMemo(() => {
        const params = new URLSearchParams({ id: '1' });
        const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}?${params}`);

        return ws;
    }, []);

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