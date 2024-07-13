export type ObjectRouter = {
  href: string
  name?: string
  hrefIcon?: string
  type: "public" | "protected"
}

export type FieldRouter = "LOGIN" | "HOME" | "REGISTER";
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
    href: "/",
    type: "public",
    name: "PKA-ECOM",
  },
}