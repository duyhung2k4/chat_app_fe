import React, { createContext, useEffect, useState } from "react";
import { Box, Tabs } from "@mantine/core";

import HomeTabList from "./components/TabList";
import HomeTabPanel from "./components/TabPanel";

import { useGetCategoryQuery } from "@/redux/api/typeProduct.api";
import { CategoryModel } from "@/model/category";


const Home: React.FC = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const {
        data,
        refetch,
    } = useGetCategoryQuery(null);

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        setCategories(data?.data || []);
    }, [data]);

    return (
        <HomeContext.Provider
            value={{
                categories,
                setCategories,
            }}
        >
            <Box>
                {
                    categories.length > 0 &&
                    <Tabs variant="pills" radius="xl" defaultValue={categories[0]?.code}>
                        <HomeTabList />
                        {
                            categories.map((item) =>
                                <Tabs.Panel key={item.ID} value={item.code}>
                                    <HomeTabPanel
                                        value={item.code}
                                    />
                                </Tabs.Panel>
                            )
                        }
                    </Tabs>
                }
            </Box>
        </HomeContext.Provider>
    )
}

export type TypeHomeContext = {
    categories: CategoryModel[]
    setCategories: React.Dispatch<React.SetStateAction<CategoryModel[]>>
}

export const HomeContext = createContext<TypeHomeContext>({
    categories: [],
    setCategories: () => { },
})

export default Home;