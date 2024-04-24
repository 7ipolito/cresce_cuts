import { ErrorFormTypes } from 'enums/erros.enum'
import { number, object, string } from 'yup'

export const schemaCreateDiscount = object().shape({
  nameDiscount: string().required(ErrorFormTypes.OBRIGATORIO),
  description: string().required(ErrorFormTypes.OBRIGATORIO),
  // .min(50, 'O campo deve ter pelo menos 100 caracteres.'),

  price: number()
    .typeError(ErrorFormTypes.VALOROBRIGATORIO)
    .required(ErrorFormTypes.OBRIGATORIO),

  priceWithDiscount: number()
    .typeError(ErrorFormTypes.VALOROBRIGATORIO)
    .notRequired(),

  take: number().typeError(ErrorFormTypes.VALOROBRIGATORIO).notRequired(),

  pay: number().typeError(ErrorFormTypes.VALOROBRIGATORIO).notRequired(),

  activateDate: string().required(ErrorFormTypes.OBRIGATORIO),
  desactiveDate: string().required(ErrorFormTypes.OBRIGATORIO),
  typeDiscount: string().required(ErrorFormTypes.OBRIGATORIO),
  percentDiscount: number()
    .typeError(ErrorFormTypes.VALOROBRIGATORIO)
    .notRequired(),
})
