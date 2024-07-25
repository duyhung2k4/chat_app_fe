import React, { Suspense } from "react";

import { LoadingOverlay } from "@mantine/core";
import { useOutlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const outlet = useOutlet();

  return (
    <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }}/>}>
      {outlet}
    </Suspense>
  )
}

export default AuthLayout;