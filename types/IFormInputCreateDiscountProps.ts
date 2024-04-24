export interface IFormInputCreateDiscountProps {
  nameDiscount: string
  description: string
  price: number | string
  priceWithDiscount?: number | string
  take?: number | string
  pay?: number | string
  activateDate?: string
  desactiveDate?: string
  typeDiscount: string
  percentDiscount?: number | string
}
