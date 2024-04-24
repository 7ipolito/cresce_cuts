import { ErrorFormTypes } from 'enums/erros.enum'
import { object, string, number } from 'yup'

export const schemaEditDiscount = object().shape({
  title: string().required(ErrorFormTypes.OBRIGATORIO),
  description: string().required(ErrorFormTypes.OBRIGATORIO),

  price: number()
    .typeError(ErrorFormTypes.VALOROBRIGATORIO)
    .required(ErrorFormTypes.OBRIGATORIO),

  priceWithDiscount: number()
    .typeError(ErrorFormTypes.VALOROBRIGATORIO)
    .notRequired(),

  take: number().typeError(ErrorFormTypes.VALOROBRIGATORIO).notRequired(),

  pay: number().typeError(ErrorFormTypes.VALOROBRIGATORIO).notRequired(),
  percentDiscount: number()
    .typeError(ErrorFormTypes.VALOROBRIGATORIO)
    .notRequired(),
})
