export enum TOKEN_TYPE {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  INFO_REPEAT_CODE = "info_repeat_code",
}

export const ROLE_APP = "user";

export type TYPE_MESS = 
    | "box_chat" 
    | "group_chat"
    | "create_group_chat"
    | "add_member";