import type { IGetProductResponse } from '@/api/models/product'

export interface CartItem extends IGetProductResponse {
  cartQuantity: number
  addedAt: number
}
