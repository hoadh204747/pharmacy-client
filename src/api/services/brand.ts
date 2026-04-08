import axiosInstance from '@/helpers/https'
import type { IGetBrandResponse } from '../models/brand'

export class BrandService {
  public static readonly getAllBrands: () => Promise<IGetBrandResponse[]> = async () =>
    axiosInstance.get<IGetBrandResponse[]>('/brands').then((res) => res.data)

  public static readonly getBrandsByCategory: (categoryId: number) => Promise<IGetBrandResponse[]> =
    async (categoryId) =>
      axiosInstance
        .get<IGetBrandResponse[]>(`/brands/category/${categoryId}`)
        .then((res) => res.data)
}
