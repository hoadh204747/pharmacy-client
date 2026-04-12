import axiosInstance from '@/helpers/https'
import type { ICreateOrderRequest } from '../models/order'

export class OrderService {
  public static readonly createOrder: (requestObj: ICreateOrderRequest) => Promise<any> = async (
    requestObj,
  ) => axiosInstance.post('/orders', requestObj).then((res) => res.data)
}
