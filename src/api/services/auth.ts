import axiosInstance from '@/helpers/https'
import type { ILoginRequest, ILoginResponse } from '../models/auth'

export class AuthService {
  public static readonly login: (data: ILoginRequest) => Promise<ILoginResponse> = async (data) =>
    axiosInstance.post<ILoginResponse>('/auth/login', data).then((res) => res.data)
}
