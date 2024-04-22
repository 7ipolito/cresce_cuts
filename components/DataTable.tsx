/* eslint-disable @next/next/no-img-element */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Button } from './Button'
import Switch from './Switch'
import * as Select from './Form/Select'
import * as Dialog from '@radix-ui/react-dialog'
import { TypeDiscount } from 'utils/types.enum'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Discount } from 'utils/DiscountProps'
type DataTableProps = { columns: any[]; data: Discount[] }
const DataTable = ({ columns, data }: DataTableProps) => {
  const [discountSelected, setDiscountSelected] = useState<Discount>(
    {} as Discount,
  )

  useEffect(() => {
    console.log(discountSelected)
  }, [discountSelected])
  return (
    <Dialog.Root>
      <div className="rounded-md bg-white px-4 py-6">
        <div className="w-100 flex items-center justify-between pb-6">
          <h2 className="text-xl font-thin text-grey-primary">
            Descontos cadastrados
          </h2>
          <Button>Novo Desconto</Button>
        </div>
        <div className="w-100 flex flex-col items-center gap-2 pb-6 lg:flex-row lg:justify-between">
          <div className="w-full">
            <p className="text-sm text-grey-secondary">Status</p>
            <Select.Root name="timezone">
              <Select.Trigger>
                <Select.Value placeholder="Selecione o status" />
              </Select.Trigger>

              <Select.Content>
                <Select.Item value="utc-3">
                  <Select.ItemText>Ativado</Select.ItemText>
                </Select.Item>

                <Select.Item value="utc-1">
                  <Select.ItemText>Desativado</Select.ItemText>
                </Select.Item>
              </Select.Content>
            </Select.Root>
          </div>

          <div className="w-full">
            <p className="text-sm text-grey-secondary">Tipo desconto</p>
            <Select.Root name="timezone">
              <Select.Trigger>
                <Select.Value placeholder="Selecione o tipo de desconto" />
              </Select.Trigger>

              <Select.Content>
                <Select.Item value="1">
                  <Select.ItemText>De/Por</Select.ItemText>
                </Select.Item>
                <Select.Item value="2">
                  <Select.ItemText>Percentual</Select.ItemText>
                </Select.Item>
                <Select.Item value="3">
                  <Select.ItemText>Leve + Pague -</Select.ItemText>
                </Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </div>
        <div className="relative w-full overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {columns.map((title) => (
                  <th key={title} scope="col" className="px-6 py-3">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((data: Discount) => (
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-14 py-4">
                    <div className="flex flex-row items-center">
                      <div className="bg-red w-20">
                        <img src={data.image} alt="Imagem do produto" />
                      </div>
                      <p className="ml-4">{data.title}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {data.type == TypeDiscount.DEPOR
                      ? 'De / Por'
                      : data.type == TypeDiscount.LEVEMAISPAGUEMENOS
                        ? 'Leve + Pague -'
                        : 'Percentual'}
                  </td>
                  <td className="px-6 py-4">{data.activationDate}</td>
                  <td className="px-6 py-4">{data.desactivationDate}</td>
                  <td className="px-6 py-4">
                    <Switch checked={data.activate} />
                  </td>
                  <td className="px-6 py-4">
                    <Dialog.Trigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          console.log(discountSelected)
                          setDiscountSelected(data)
                        }}
                      >
                        <img src="/eye.png" />
                      </Button>
                    </Dialog.Trigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[659px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex justify-center">
            <Dialog.Title className=" pb-5 text-[16px] font-medium">
              Detalhes do produto
            </Dialog.Title>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <Dialog.Description className="flex flex-row justify-between">
            <div className=" w-96 px-4">
              <img src={discountSelected.image} width={150} />
            </div>
            <div>
              {discountSelected.type !== TypeDiscount.DEPOR && (
                <p className="text-2xl font-medium text-grey-primary">
                  {discountSelected.discountText}
                </p>
              )}
              <p className="text-sm text-grey-primary">
                {discountSelected.title}
              </p>
              <p className="text-sm text-grey-secondary">
                {discountSelected.description}
              </p>
              {discountSelected.type == TypeDiscount.DEPOR ||
              discountSelected.type == TypeDiscount.PERCENTUAL ? (
                <div>
                  {discountSelected.type == TypeDiscount.DEPOR && <p>de</p>}
                  <p className="text-2xl font-medium text-grey-secondary line-through">
                    {discountSelected.price}
                  </p>
                  {discountSelected.type == TypeDiscount.DEPOR && (
                    <span>por</span>
                  )}
                  <p className="text-2xl font-medium text-grey-secondary">
                    {discountSelected.priceWithDiscount}
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-medium text-grey-secondary">
                  {discountSelected.price}
                </p>
              )}
            </div>
          </Dialog.Description>

          <div className="mt-[25px] flex justify-end">
            <div className="flex w-full justify-between gap-2">
              <Button className="w-full" variant="outline">
                Editar
              </Button>
              <Dialog.Close asChild>
                <Button className="w-full">Fechar</Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DataTable
