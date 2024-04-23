import { TypeDiscount } from './types.enum'
interface Rating {
  rate: number
  count: number
}

export interface Discount {
  id: number
  title: string
  price: number
  take?: number
  pay?: number
  percentDiscount?: number
  priceWithDiscount?: number
  priceBefore?: number
  discountText?: string
  type: TypeDiscount
  activationDate: string
  desactivationDate: string
  activate: boolean
  description: string
  category: string
  image: string
  rating: Rating
}
