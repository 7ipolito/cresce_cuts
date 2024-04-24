import { TypeDiscount } from '../enums/types.enum'

export interface Discount {
  id: string
  title: string
  price: number
  take?: number
  pay?: number
  percentDiscount?: number
  priceWithDiscount?: number
  priceBefore?: number
  type: TypeDiscount
  activationDate: string
  desactivationDate: string
  activate: boolean
  description: string
  image: string
}
