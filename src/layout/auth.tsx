import React, { Suspense, useEffect } from "react";
import Cookies from "js-cookie";

import { TOKEN_TYPE } from "@/model/variable";
import { LoadingOverlay } from "@mantine/core";
import { useNavigate, useOutlet } from "react-router-dom";
import { ROUTER } from "@/constants/router";

const AuthLayout: React.FC = () => {
  const navigation = useNavigate();
  const outlet = useOutlet();

  const accessToken = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
  const refreshToken = Cookies.get(TOKEN_TYPE.REFRESH_TOKEN);

  useEffect(() => {
    const isToken = !accessToken || !refreshToken ? false : true;
    if (isToken === true) {
      const pathname = window.location.pathname;
      navigation(pathname !== ROUTER.REGISTER.href ? pathname : "/");
    }

    if (isToken === false) {
      navigation(ROUTER.REGISTER.href);
    }
  }, [accessToken, refreshToken]);

  return (
    <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }}/>}>
      {outlet}
    </Suspense>
  )
}

export default AuthLayout;