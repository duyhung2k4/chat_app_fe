import React, { Suspense, useEffect } from "react";

import { LoadingOverlay } from "@mantine/core";
import { useNavigate, useOutlet } from "react-router-dom";
import { useRefreshTokenMutation } from "@/redux/api/auth.api";
import { ROUTER } from "@/constants/router";

const ProtectedLayout: React.FC = () => {
  const outlet = useOutlet();

  const [ refresh ] = useRefreshTokenMutation();
  const navigation = useNavigate();

//   const handleRefresh = async () => {
//     const res = await refresh(null);
//     if("error" in res) {
//       navigation(ROUTER.REGISTER.href);
//     }
//   }

//   useEffect(() => {
//     handleRefresh();
//   }, []);

  return (
    <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
      {outlet}
    </Suspense>
  )
}

export default ProtectedLayout;