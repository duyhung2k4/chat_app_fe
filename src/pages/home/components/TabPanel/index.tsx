import React from "react";
import { Box } from "@mantine/core";


const HomeTabPanel: React.FC<{ value: string }> = ({ value }) => {
    return (
        <Box pt={8}>
            {value}
        </Box>
    )
}

export default HomeTabPanel;