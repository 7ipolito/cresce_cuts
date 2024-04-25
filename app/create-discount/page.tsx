/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable eqeqeq */
/* eslint-disable @next/next/no-img-element */

'use client'
import { Button } from 'components/Button'
import * as Input from '../../components/Form/Input'
import React, { useState } from 'react'
import Switch from 'components/Switch'
import { UploadDropzone } from 'utils/uploadthing'
import { TypeDiscount } from 'enums/types.enum'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaCreateDiscount } from 'utils/schemaCreateDiscount'
import { useDiscount } from 'hooks/useDiscount'
import { v4 as uuidv4 } from 'uuid'
import { utilsHours } from 'utils/activateDates'
import { Discount } from 'types/DiscountProps'
import { ErrorFormTypes } from 'enums/erros.enum'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { optionsSelect } from 'utils/dataMocked'

const CreateDiscount = () => {
  const router = useRouter()

  const [imageUploadedError, setImageUploadedError] = useState(false)
  const [imageUploadedUrl, setImageUploadedUrl] = useState('')
  const [discountTypeSelected, setDiscountTypeSelected] = useState()
  const [switchActive, setSwitchActive] = useState(true)

  const { createDiscount } = useDiscount()

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCreateDiscount),
  })

  const onSubmit = async (data: any) => {
    if (imageUploadedUrl) {
      if (discountTypeSelected == TypeDiscount.DEPOR) {
        const newData: Discount = {
          title: data.nameDiscount,
          description: data.description,
          price: data.price,
          priceWithDiscount: data.priceWithDiscount,
          activate: switchActive,
          image: imageUploadedUrl,
          id: uuidv4(),
          type: data.typeDiscount,
          activationDate: data.activateDate,
          desactivationDate: data.desactiveDate,
        }
        createDiscount(newData)
        router.push('/')
      } else if (discountTypeSelected == TypeDiscount.LEVEMAISPAGUEMENOS) {
        const newData: Discount = {
          title: data.nameDiscount,
          description: data.description,
          price: data.price,
          pay: data.pay,
          take: data.take,
          activate: switchActive,
          image: imageUploadedUrl,
          id: uuidv4(),
          type: data.typeDiscount,
          activationDate: data.activateDate,
          desactivationDate: data.desactiveDate,
        }
        createDiscount(newData)
        router.push('/')
      } else if (discountTypeSelected == TypeDiscount.PERCENTUAL) {
        const newData: Discount = {
          title: data.nameDiscount,
          description: data.description,
          price: data.price,
          percentDiscount: data.percentDiscount,
          activate: switchActive,
          image: imageUploadedUrl,
          id: uuidv4(),
          type: data.typeDiscount,
          activationDate: data.activateDate,
          desactivationDate: data.desactiveDate,
        }
        createDiscount(newData)
        router.push('/')
      }
    } else {
      setImageUploadedError(true)
    }
  }

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
                onClick={setSwitchActive}
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
                  role="nameDiscountRole"
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
                  role="descriptionRole"
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
              role="selectTypeDiscountRole"
              {...register('typeDiscount', {
                onChange: (e) => {
                  setDiscountTypeSelected(e.target.value)
                },
              })}
              name={'typeDiscount'}
              defaultValue=""
              id={'typeDiscount'}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              {optionsSelect.map((option) => (
                <option key={option.value} value={option.value}>
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
                    role="priceDPRole"
                    name="price"
                    id="price"
                    type="number"
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
                    role="priceWithDiscountRole"
                    name="priceWithDiscount"
                    id="priceWithDiscount"
                    type="number"
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
                    role="priceLPMRole"
                    name="price"
                    id="price"
                    type="number"
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
                    role="takeRole"
                    name="take"
                    id="take"
                    type="number"
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
                    role="payRole"
                    id="pay"
                    type="number"
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
                    role="pricePRole"
                    id="price"
                    type="number"
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
                    role="percentDiscountRole"
                    name="percentDiscount"
                    id="percentDiscount"
                    type="number"
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
                role="selectActivateDateRole"
                {...register('activateDate')}
                name={'activateDate'}
                id={'activateDate'}
                defaultValue=""
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option key="1" value="">
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
                role="selectDesactiveDateSelectRole"
                {...register('desactiveDate')}
                defaultValue=""
                name={'desactiveDate'}
                id={'desactiveDate'}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option key="1" value="">
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
            {imageUploadedUrl ? (
              <div className="tems-center flex justify-center">
                <img src={imageUploadedUrl} width={500} alt="Imagem" />
              </div>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  // Do something with the response
                  setImageUploadedError(false)
                  setImageUploadedUrl(res[0].url)

                  console.log('Files: ', res)
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`)
                }}
              />
            )}
            {imageUploadedError && (
              <span role="errorImageRole" className="text-red-500">
                {ErrorFormTypes.ERROIMAGEM}
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-5">
            <Link href="/">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
            {imageUploadedUrl && (
              <Button
                onClick={() => {
                  setImageUploadedUrl('')
                  if (!imageUploadedUrl) {
                    setImageUploadedError(true)
                  }
                }}
              >
                Editar imagem
              </Button>
            )}
            <Button
              type="submit"
              role="buttonSave"
              form="form-create-discount"
              variant="primary"
              onClick={() => {
                handleSubmit(onSubmit)
                if (!imageUploadedUrl) {
                  setImageUploadedError(true)
                }
              }}
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
