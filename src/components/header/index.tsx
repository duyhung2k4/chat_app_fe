import React, { createContext, useState } from "react";

import HeaderOption from "./components/options";
import AppHeaderNavlinks from "./components/navlinks";
import { Group, Image, NavLink, Stack, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ROUTER } from "@/constants/router";
import { useNavigate } from "react-router";

import FindIcon from "@/assets/icon/find-svgrepo-com.svg";
import classes from "./style.module.css";
import AppHeaderDrawer from "./components/drawer";


const AppHeader: React.FC = () => {
    const [drawer, setDrawer] = useState<boolean>(false);
    const matched_1100 = useMediaQuery('(max-width: 1100px)');
    const matched_850 = useMediaQuery('(max-width: 850px)');
    const matched_550 = useMediaQuery('(max-width: 550px)');

    const navigation = useNavigate();

    return (
        <AppHeaderContext.Provider
            value={{
                matched_1100,
                matched_850,
                matched_550,
                drawer,
                setDrawer,
            }}
        >
            <Group
                align="center"
                justify={matched_550 ? "space-between" : "center"}
                gap={"10%"}
                className={classes.root}
            >
                <Group>
                    <Image src={FindIcon} height={24} width={24} />
                    <TextInput
                        variant="unstyled"
                        className={classes.text__input}
                    />
                </Group>
                <Stack 
                    h={50} 
                    justify="center"
                    display={matched_550 ? "none" : undefined}
                >
                    {
                        matched_850 ?
                            <NavLink
                                className={classes.navlink__home}
                                onClick={() => navigation(ROUTER.HOME.href)}
                                label={ROUTER.HOME?.name || ""}
                                active={(ROUTER.HOME?.href || "") == window.location.pathname}
                                classNames={{
                                    label: classes.navlink__label
                                }}
                            />
                            :
                            <AppHeaderNavlinks />
                    }
                </Stack>
                <HeaderOption />
            </Group>

            <AppHeaderDrawer/>
        </AppHeaderContext.Provider>
    )
}

export type TypeAppHeaderContext = {
    matched_1100: boolean | undefined
    matched_850: boolean | undefined
    matched_550: boolean | undefined

    drawer: boolean
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppHeaderContext = createContext<TypeAppHeaderContext>({
    matched_1100: true,
    matched_850: true,
    matched_550: true,
    drawer: false,
    setDrawer: () => {},
})

export default AppHeader;