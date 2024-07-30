import React from "react";
import AuthLayout from "../layout/auth";
import ProtectedLayout from "../layout/protected";
import AppshellLayout from "@/layout/appShell";

import { Routes, Route } from "react-router";

import {  
    PageAcceptCode,
    PageHome,
    PageLogin, 
    PageNotFound,
    PageRegister,
    PageTest,
} from "./lazy";
import { ROUTER } from "@/constants/router";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTER.LOGIN.href} element={<PageLogin />} />
        <Route path={ROUTER.REGISTER.href} element={<PageRegister />} />
        <Route path={ROUTER.ACCEPT_CODE.href} element={<PageAcceptCode/>} />

        <Route element={<ProtectedLayout/>}>
          <Route element={<AppshellLayout/>}>
            <Route path={ROUTER.HOME.href} element={<PageHome/>} />
            <Route path={ROUTER.BOX_CHAT.href} element={<PageHome/>} />
            <Route path={ROUTER.GROUP_CHAT.href} element={<PageHome/>} />
            <Route path={ROUTER.TEST.href} element={<PageTest/>} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound/>}/>
      </Route>
    </Routes>
  )
}

export default AppRouter;