export type ObjectRouter = {
  href: string
  name?: string
  hrefIcon?: string
  type: "public" | "protected"
}

export type FieldRouter = 
    | "LOGIN" 
    | "HOME" 
    | "REGISTER" 
    | "ACCEPT_CODE" 
    | "BOX_CHAT"
    | "GROUP_CHAT"
    | "TEST";
export const ROUTER: Record<FieldRouter, ObjectRouter> = {
  LOGIN: {
    href: "/login",
    type: "public",
  },
  REGISTER: {
    href: "/register",
    type: "public",
  },
  HOME: {
    href: "/*",
    type: "public",
    name: "PKA-ECOM",
  },
  TEST: {
    href: "/test",
    type: "public",
  },
  ACCEPT_CODE: {
    href: "/accept-code",
    type: "public",
  },
  BOX_CHAT: {
    href: "/box/:id",
    type: "public",
  },
  GROUP_CHAT: {
    href: "/group/:id",
    type: "public",
  },
}