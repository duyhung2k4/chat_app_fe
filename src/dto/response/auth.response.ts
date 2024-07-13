import { ProfileModel } from "@/model/profile"

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  profile: ProfileModel
}