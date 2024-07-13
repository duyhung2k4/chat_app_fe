import React, { useContext } from "react";
import { Drawer, Group, Text } from "@mantine/core";
import { AppHeaderContext, TypeAppHeaderContext } from "../..";

import classes from "./style.module.css";


const AppHeaderDrawer: React.FC = () => {
    const { drawer, setDrawer, matched_550 } = useContext<TypeAppHeaderContext>(AppHeaderContext);

    return (
        <Drawer
            opened={drawer}
            onClose={() => setDrawer(false)}
            onClickCapture={() => setDrawer(false)}
            size={matched_550 ? "100%" : undefined}
            classNames={{
                header: classes.header,
                body: classes.body,
            }}
        >
            <Group 
                align="start"
                className={classes.title}
            >
                <Text size="20px" fw={600}>PKA-ECOM</Text>
            </Group>
        </Drawer>
    )
}

export default AppHeaderDrawer;