import React from "react";
import { NavLink } from "@mantine/core";
import { IconHome, IconShoppingBag } from '@tabler/icons-react';
import { useNavigate } from "react-router";

const AppNavbar: React.FC = () => {
    const navigation = useNavigate();
    const path = window.location.pathname;
    return (
        <>
            <NavLink
                onClick={() => navigation("/")}
                active={path === "/"}
                label="Trang chủ"
                leftSection={<IconHome size="1rem" stroke={2} />}
                childrenOffset={28}
            />
            <NavLink
                onClick={() => navigation("/me/shop")}
                active={path === "/me/shop"}
                label="Shop của bạn"
                leftSection={<IconShoppingBag size="1rem" stroke={2} />}
                childrenOffset={28}
            />
        </>
    )
}

export default AppNavbar;