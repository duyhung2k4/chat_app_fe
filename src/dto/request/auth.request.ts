export type RegisterRequest = {
    firstName: string
    lastName: string
    email: string
    password: string
    repeatPassword: string
}

export type GetTimeCodePedingRequest = {
    email: string
}