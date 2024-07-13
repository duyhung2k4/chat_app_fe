import React, { createContext } from "react";
import { Box, Stack } from '@mantine/core';
import { useOutlet } from "react-router";
import AppHeader from "@/components/header";

export type AppShellContextType = {
  mobileOpened: boolean
  desktopOpened: boolean
  toggleMobile: () => void
  toggleDesktop: () => void
}

export const AppShellContext = createContext<AppShellContextType>({
  mobileOpened: false,
  desktopOpened: false,
  toggleMobile: () => { },
  toggleDesktop: () => { },
})

const AppshellLayout: React.FC = () => {
  const outlet = useOutlet();

  return (
    <Stack gap={0}>
      <AppHeader/>
      <Box p={8}>
        {outlet}
      </Box>
    </Stack>
  )
}

export default AppshellLayout;