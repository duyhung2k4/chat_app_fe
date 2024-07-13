import React, { useContext } from "react";
import { Group, Image } from "@mantine/core";
import { AppHeaderContext, TypeAppHeaderContext } from "../..";

import UserIcon from "@/assets/icon/user-svgrepo-com.svg";
import CarIcon from "@/assets/icon/car-round-645-svgrepo-com.svg";
import RingIcon from "@/assets/icon/ring-ringing-alert-bell-svgrepo-com.svg";
import OptionIcon from "@/assets/icon/menu-vertical-svgrepo-com.svg";

import classes from "./style.module.css";


const HeaderOption: React.FC = () => {
    const { matched_1100, setDrawer } = useContext<TypeAppHeaderContext>(AppHeaderContext)
    return (
        <>
            {
                matched_1100 ?
                    <Image 
                        className={classes.icon} 
                        src={OptionIcon} 
                        height={24} width={24} 
                        onClick={() => setDrawer(true)}
                    />
                    :
                    <Group gap={30}>
                        <Image className={classes.icon} src={CarIcon} height={24} width={24} />
                        <Image className={classes.icon} src={RingIcon} height={24} width={24} />
                        <Image className={classes.icon} src={UserIcon} height={24} width={24} />
                    </Group>
            }
        </>
    )
}

export default HeaderOption;