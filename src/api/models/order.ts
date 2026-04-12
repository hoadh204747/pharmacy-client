export enum EPaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
}

export interface ICreateOrderRequest {
  paymentMethod: EPaymentMethod
  shippingAddress: {
    province: string
    district: string
    ward: string
    address: string
    fullname: string
    phone: string
    email?: string
  }
  orderItems: {
    productId: number
    amount: number
  }[]
}
