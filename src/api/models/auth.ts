export interface ILoginRequest {
  phone: string
  password: string
}

export interface ILoginResponse {
  token: string
  user: {
    id: number
    username: string
    email: string
    phone: string
    role: string
  }
}
