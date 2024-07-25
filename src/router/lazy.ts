import { lazy } from "react";

// auth page
export const PageLogin = lazy(() => import("@/pages/login"));
export const PageRegister = lazy(() => import("@/pages/register"));

// protected page
export const PageHome = lazy(() => import("@/pages/home"));
export const PageAcceptCode = lazy(() => import("@/pages/accept_code"));
export const PageTest = lazy(() => import("@/pages/test"));

// other
export const PageNotFound = lazy(() => import("@/pages/not_found"));