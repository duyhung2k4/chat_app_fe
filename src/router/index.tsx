import React from "react";
import AuthLayout from "../layout/auth";
import ProtectedLayout from "../layout/protected";
import AppshellLayout from "@/layout/appShell";

import { Routes, Route } from "react-router";

import {  
    PageHome,
    PageLogin, 
    PageNotFound,
    PageRegister,
} from "./lazy";
import { ROUTER } from "@/constants/router";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTER.LOGIN.href} element={<PageLogin />} />
        <Route path={ROUTER.REGISTER.href} element={<PageRegister />} />

        <Route element={<ProtectedLayout/>}>
          <Route element={<AppshellLayout/>}>
            <Route path={ROUTER.HOME.href} element={<PageHome/>} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound/>}/>
      </Route>
    </Routes>
  )
}

export default AppRouter;