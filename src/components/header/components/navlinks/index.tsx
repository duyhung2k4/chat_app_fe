import React, { useContext, useEffect, useState } from "react";
import { ObjectRouter, ROUTER } from "@/constants/router";
import { Box, Group, NavLink } from "@mantine/core";
import { useNavigate } from "react-router";

import classes from "./style.module.css";
import { AppHeaderContext, TypeAppHeaderContext } from "../..";


const AppHeaderNavlinks: React.FC = () => {
    const [navlinks, setNavlinks] = useState<ObjectRouter[]>([]);

    const navigation = useNavigate();
    const { matched_850 } = useContext<TypeAppHeaderContext>(AppHeaderContext);

    useEffect(() => {
        setNavlinks([
            ROUTER.SHOPS,
            ROUTER.HOME,
            ROUTER.TOP_SALE,
        ])
    }, []);


    return (
        <Group gap={50} display={matched_850 ? "none" : undefined}>
        {
            navlinks.map((item, i) => (
                <Box key={i}>
                    <NavLink
                        className={classes.nav__link}
                        onClick={() => navigation(item.href)}
                        label={item?.name || ""}
                        active={(item?.href || "") == window.location.pathname}
                        classNames={{
                            label: classes.nav__link__active
                        }}
                    />
                </Box>
            ))
        }
    </Group>
    )
}

export default AppHeaderNavlinks;