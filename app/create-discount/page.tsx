'use client'
import { Button } from 'components/Button'
import * as Input from '../../components/Form/Input'
import React, { useEffect, useState } from 'react'
import Switch from 'components/Switch'
import { UploadDropzone } from 'utils/uploadthing'
import { TypeDiscount } from 'enums/types.enum'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IFormInputCreateDiscountProps } from 'types/IFormInputCreateDiscountProps'
import { schemaCreateDiscount } from 'utils/schemaCreateDiscount'
import { useDiscount } from 'hooks/useDiscount'
import Select from 'components/Form/Select'
import { utilsHours } from 'utils/activateDates'
import { Discount } from 'types/DiscountProps'

const CreateDiscount: React.FC = () => {
  const options = [
    {
      isSelected: true,
      text: 'Selecione o tipo de desconto',
      value: '',
    },
    { text: 'De / Por', value: TypeDiscount.DEPOR },
    {
      text: 'Leve + Pague -',
      value: TypeDiscount.LEVEMAISPAGUEMENOS,
    },
    { text: 'Percentual', value: TypeDiscount.PERCENTUAL },
  ]
  const [imageUploaded, setImageUploaded] = useState()
  const [discountTypeSelected, setDiscountTypeSelected] = useState()
  const [switchActive, setSwitchActive] = useState(true)

  const { setDiscount } = useDiscount()

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<IFormInputCreateDiscountProps>({
    resolver: yupResolver(schemaCreateDiscount),
  })

  const onSubmit = async (data: any) => {
    if (discountTypeSelected == TypeDiscount.DEPOR) {
      const newData: Discount = {
        title: data.nameDiscount,
        description: data.description,
        price: data.price,
        priceWithDiscount: data.priceWithDiscount,
        activate: switchActive,
      }
      console.log(newData)
    } else if (discountTypeSelected == TypeDiscount.LEVEMAISPAGUEMENOS) {
      const newData: Discount = {
        title: data.nameDiscount,
        description: data.description,
        price: data.price,
        pay: data.pay,
        take: data.take,
        activate: switchActive,
      }
      console.log(newData)
    } else if (discountTypeSelected == TypeDiscount.PERCENTUAL) {
      console.log(data)
      const newData: Discount = {
        title: data.nameDiscount,
        description: data.description,
        price: data.price,
        percentDiscount: data.percentDiscount,
        activate: switchActive,
      }
      console.log(newData)
    }
  }

  useEffect(() => {}, [errors])

  return (
    <>
      <div className="pb-6">
        <h1 className="text-3xl font-medium text-grey-secondary">
          Cadastrar Desconto
        </h1>
        <p className="text-sm text-grey-primary">
          Loja: Super João - Nova loja online
        </p>
      </div>

      <div className="rounded-md bg-white px-6 py-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between  lg:flex-row  ">
            <h2 className="text-xl font-thin text-grey-primary">
              Formulário cadastro desconto
            </h2>

            <div className="flex items-center gap-2">
              <p className="text-sm text-grey-primary">Ativo</p>
              <Switch
                role="switchRole"
                checked={switchActive}
                onClick={(e) => {
                  setSwitchActive(e)
                }}
              />
            </div>
          </div>
        </div>

        <form
          id="form-create-discount"
          className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="lg:grid-cols-form grid gap-3">
            <label
              htmlFor="nameDiscount"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Nome do desconto
            </label>
            <div className="grid gap-6 ">
              <Input.Root>
                <input
                  {...register('nameDiscount')}
                  name="nameDiscount"
                  id="nameDiscount"
                  type="text"
                  defaultValue=""
                  placeholder="Informe o Nome do desconto"
                  className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                />
              </Input.Root>
              <span className="text-red-500">
                {errors.nameDiscount?.message}
              </span>
            </div>
          </div>
          <div className="grid gap-3 pt-5">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Descrição
            </label>
            <div className="flex flex-col gap-3">
              <Input.Root>
                <input
                  {...register('description')}
                  id="description"
                  type="description"
                  name="description"
                  defaultValue=""
                  placeholder="Informe a descrição"
                  className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                />
              </Input.Root>
              <span className="text-red-500">
                {errors.description?.message}
              </span>
            </div>
          </div>
          <div className="grid gap-3 pt-5">
            <label
              htmlFor="typeDiscount"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
            >
              Tipo de desconto
            </label>

            <select
              {...register('typeDiscount', {
                onChange: (e) => {
                  setDiscountTypeSelected(e.target.value)
                },
              })}
              name={'typeDiscount'}
              id={'typeDiscount'}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              {options.map((option) => (
                <option
                  key={option.value}
                  selected={option.isSelected}
                  value={option.value}
                >
                  {option.text}
                </option>
              ))}
            </select>
            <span className=" text-red-500">
              {errors.typeDiscount?.message}
            </span>
          </div>
          {discountTypeSelected == TypeDiscount.DEPOR && (
            <div className="w-100 flex flex-col items-center  gap-2 pb-6 lg:flex-row lg:justify-between">
              <div className="w-full pt-5">
                <label
                  htmlFor="price"
                  className="text-sm text-grey-secondary dark:text-zinc-100 "
                >
                  Preço "DE"
                </label>
                <Input.Root className="mb-2">
                  <input
                    {...register('price')}
                    name="price"
                    id="price"
                    type="text"
                    defaultValue=""
                    placeholder="00,00R$"
                    className="flex-1  border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                  />
                </Input.Root>
                <span className=" text-red-500">{errors.price?.message}</span>
              </div>

              <div className="w-full pt-5">
                <p className="text-sm text-grey-secondary">Preço "POR"</p>
                <Input.Root className="mb-2">
                  <input
                    {...register('priceWithDiscount')}
                    name="priceWithDiscount"
                    id="priceWithDiscount"
                    type="text"
                    defaultValue=""
                    placeholder="00,00R$"
                    className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                  />
                </Input.Root>
                <span className="text-red-500">
                  {errors.priceWithDiscount?.message}
                </span>
              </div>
            </div>
          )}

          {discountTypeSelected == TypeDiscount.LEVEMAISPAGUEMENOS && (
            <div className="w-100 flex flex-col items-center gap-2 pb-6 lg:flex-row lg:justify-between">
              <div className="w-full pt-5">
                <label
                  htmlFor="price"
                  className="text-sm  text-grey-secondary dark:text-zinc-100"
                >
                  Preço
                </label>
                <Input.Root>
                  <input
                    {...register('price')}
                    name="price"
                    id="price"
                    type="text"
                    defaultValue=""
                    placeholder="00,00R$"
                    className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                  />
                </Input.Root>
                <span className="text-red-500">{errors.price?.message}</span>
              </div>

              <div className="w-full pt-5">
                <p className="text-sm text-grey-secondary">Leve</p>
                <Input.Root>
                  <input
                    {...register('take')}
                    name="take"
                    id="take"
                    type="text"
                    defaultValue=""
                    placeholder='Valor de "Leve"'
                    className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                  />
                </Input.Root>
                <span className="text-red-500">{errors.take?.message}</span>
              </div>

              <div className="w-full pt-5">
                <p className="text-sm text-grey-secondary">Pague</p>
                <Input.Root>
                  <input
                    {...register('pay')}
                    name="pay"
                    id="pay"
                    type="text"
                    defaultValue=""
                    placeholder='Valor de "Pague"'
                    className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                  />
                </Input.Root>
                <span className="text-red-500">{errors.pay?.message}</span>
              </div>
            </div>
          )}

          {discountTypeSelected == TypeDiscount.PERCENTUAL && (
            <div className="w-100 flex flex-col items-center gap-2 pb-6 lg:flex-row lg:justify-between">
              <div className="w-full pt-5">
                <label
                  htmlFor="price"
                  className="text-sm  text-grey-secondary dark:text-zinc-100"
                >
                  Preço
                </label>
                <Input.Root>
                  <input
                    {...register('price')}
                    name="price"
                    id="price"
                    type="text"
                    defaultValue=""
                    placeholder="00,00R$"
                    className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                  />
                </Input.Root>
                <span className="text-red-500">{errors.price?.message}</span>
              </div>

              <div className="w-full pt-5">
                <p className="text-sm text-grey-secondary">
                  Percentual do desconto
                </p>
                <Input.Root>
                  <input
                    {...register('percentDiscount')}
                    name="percentDiscount"
                    id="percentDiscount"
                    type="text"
                    defaultValue=""
                    placeholder='Valor de "Pague"'
                    className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                  />
                </Input.Root>
                <span className="text-red-500">
                  {errors.percentDiscount?.message}
                </span>
              </div>
            </div>
          )}

          <div className="w-100 flex flex-col items-center gap-2 pb-6 lg:flex-row lg:justify-between">
            <div className="w-full pt-5">
              <label
                htmlFor="activateDate"
                className="text-sm  text-grey-secondary dark:text-zinc-100"
              >
                Data ativação
              </label>

              <select
                {...register('activateDate')}
                name={'activateDate'}
                id={'activateDate'}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option key="1" selected={true} value="">
                  Selecione a data de ativação
                </option>
                {utilsHours.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <span className="text-red-500">
                {errors.activateDate?.message}
              </span>
            </div>

            <div className="w-full pt-5">
              <p className="text-sm text-grey-secondary">Data de inativação</p>

              <select
                role="desactiveDateSelect"
                {...register('desactiveDate')}
                name={'desactiveDate'}
                id={'desactiveDate'}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option key="1" selected={true} value="">
                  Selecione a data de inativaçao
                </option>
                {utilsHours.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <span className="text-red-500">
                {errors.desactiveDate?.message}
              </span>
            </div>
          </div>
          <div>
            {imageUploaded ? (
              <div className="tems-center flex justify-center">
                <img src={imageUploaded} width={500} />
              </div>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  // Do something with the response
                  setImageUploaded(res[0].url)

                  console.log('Files: ', res)
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  // alert(`ERROR! ${error.message}`)
                }}
              />
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-5">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            {imageUploaded && (
              <Button onClick={() => setImageUploaded('')}>
                Editar imagem
              </Button>
            )}
            <Button
              type="submit"
              form="form-create-discount"
              variant="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateDiscount
