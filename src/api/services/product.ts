import axiosInstance from '@/helpers/https'
import type { IGetProductResponse, IPageResponse } from '../models/product'

export class ProductService {
  public static readonly getAllProducts: () => Promise<IGetProductResponse[]> = async () =>
    axiosInstance.get<IGetProductResponse[]>('/products').then((res) => res.data)

  public static readonly getProductsByCategory: (
    categoryId: number,
    params?: Record<string, any>,
  ) => Promise<IPageResponse<IGetProductResponse>> = async (categoryId, params) =>
    axiosInstance
      .get<IPageResponse<IGetProductResponse>>(`/products/by-category/${categoryId}`, {
        params,
      })
      .then((res) => res.data)

  public static readonly getProductById: (id: number) => Promise<IGetProductResponse> = async (
    id,
  ) => axiosInstance.get<IGetProductResponse>(`/products/${id}`).then((res) => res.data)
}
