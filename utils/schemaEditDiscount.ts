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
    .required(ErrorFormTypes.OBRIGATORIO),

  take: number()
    .typeError(ErrorFormTypes.VALOROBRIGATORIO)
    .required(ErrorFormTypes.OBRIGATORIO),
  pay: number()
    .typeError(ErrorFormTypes.VALOROBRIGATORIO)
    .required(ErrorFormTypes.OBRIGATORIO),
  activateDate: string().required(ErrorFormTypes.OBRIGATORIO),
  desactiveDate: string().required(ErrorFormTypes.OBRIGATORIO),
  typeDiscount: string().required(ErrorFormTypes.OBRIGATORIO),
  percentDiscount: number()
    .typeError(ErrorFormTypes.VALOROBRIGATORIO)
    .required(ErrorFormTypes.OBRIGATORIO),
})
