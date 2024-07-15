export type RegisterRequest = {
    firstName: string
    lastName: string
    email: string
    password: string
    repeatPassword: string
}

export type LoginRequest = {
    email: string
    password: string
}

export type GetTimeCodePedingRequest = {
    email: string
}

export type RepeatCodeRequest = {
    email: string
}

export type AcceptCodeRequest = {
    email: string
    code: string
}