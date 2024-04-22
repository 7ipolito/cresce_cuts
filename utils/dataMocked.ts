import { Discount } from './DiscountProps'
import { TypeDiscount } from './types.enum'

export const discounts: Discount[] = [
  {
    id: 1,
    title: 'Bolsa',
    price: 109.95,
    priceWithDiscount: 99.0,
    type: TypeDiscount.DEPOR,
    activationDate: '22/04/2026',
    desactivationDate: '22/04/2026',
    activate: true,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: 'Camisa',
    price: 12.95,
    type: TypeDiscount.LEVEMAISPAGUEMENOS,
    discountText: 'Leve 5 Pague 2',
    activationDate: '22/04/2026',
    desactivationDate: '22/04/2026',
    activate: true,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 1,
    title: 'Camisola',
    price: 109.95,
    priceWithDiscount: 99.0,
    type: TypeDiscount.PERCENTUAL,
    discountText: '10% OFF',
    activationDate: '22/04/2026',
    desactivationDate: '22/04/2026',
    activate: true,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
]

export const titles = [
  'Desconto',
  'Tipo',
  'Data ativação',
  'Data Inativação',
  'Status',
  'Edição',
]
