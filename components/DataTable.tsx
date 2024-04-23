/* eslint-disable @next/next/no-img-element */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Button } from './Button'
import Switch from './Switch'
import * as Select from './Form/Select'
import * as Dialog from '@radix-ui/react-dialog'
import { Discount } from 'types/DiscountProps'

import { TypeDiscount } from 'enums/types.enum'
import Modal from './Modal'
import Link from 'next/link'
import { ErrorFormTypes } from 'enums/erros.enum'
import { PatternTimeout } from 'enums/timeout.enum'
import { useDiscount } from 'hooks/useDiscount'
type DataTableProps = { columns: any[]; data: Discount[] }
const DataTable = ({ columns, data }: DataTableProps) => {
  const { activeDiscount, desativeDiscount } = useDiscount()

  const [discountSelected, setDiscountSelected] = useState<Discount>(
    {} as Discount,
  )
  const [statusFilterSelected, setStatusFilterSelected] = useState(null)
  const [typeDiscount, setTypeDiscountSelected] = useState(null)
  const [filteredData, setFilteredData] = useState<Discount[]>(data)
  const [loading, setIsLoading] = useState(true)
  const { getDiscounts } = useDiscount()

  useEffect(() => {
    setTimeout(() => {
      if (!filteredData[0]?.id) {
        setFilteredData(getDiscounts())
      }
      setIsLoading(false)
    }, PatternTimeout.TIMEOUTDATATABLE)

    const applyFilter = () => {
      let filtered = data

      if (statusFilterSelected !== null) {
        filtered = filtered.filter((discount) =>
          statusFilterSelected == '1' ? discount.activate : !discount.activate,
        )
      }

      if (typeDiscount !== null && typeDiscount !== TypeDiscount.NENHUM) {
        filtered = filtered.filter((discount) => discount.type === typeDiscount)
      }

      setFilteredData(filtered)
    }

    applyFilter()
  }, [
    data,
    statusFilterSelected,
    typeDiscount,
    loading,
    filteredData,
    getDiscounts,
  ])

  return (
    <Dialog.Root>
      <div className="rounded-md bg-white px-4 py-6">
        <div className="w-100 flex items-center justify-between pb-6">
          <h2 className="text-xl font-thin text-grey-primary">
            Descontos cadastrados
          </h2>
          <Link href="/create-discount">
            <Button>Novo Desconto</Button>
          </Link>
        </div>
        <div className="w-100 flex flex-col items-center gap-2 pb-6 lg:flex-row lg:justify-between">
          <div className="w-full">
            <p className="text-sm text-grey-secondary">Status</p>
            <Select.Root
              name="statusSelected"
              onValueChange={(e) => {
                setStatusFilterSelected(e)
              }}
            >
              <Select.Trigger>
                <Select.Value placeholder="Selecione o status" />
              </Select.Trigger>

              <Select.Content>
                <Select.Item value="1">
                  <Select.ItemText>Ativado</Select.ItemText>
                </Select.Item>

                <Select.Item value="0">
                  <Select.ItemText>Desativado</Select.ItemText>
                </Select.Item>
              </Select.Content>
            </Select.Root>
          </div>

          <div className="w-full">
            <p className="text-sm text-grey-secondary">Tipo desconto</p>
            <Select.Root
              name="typeDiscount"
              onValueChange={(e) => {
                setTypeDiscountSelected(e)
              }}
            >
              <Select.Trigger>
                <Select.Value placeholder="Selecione o tipo de desconto" />
              </Select.Trigger>

              <Select.Content>
                <Select.Item value={TypeDiscount.DEPOR}>
                  <Select.ItemText>De/Por</Select.ItemText>
                </Select.Item>
                <Select.Item value={TypeDiscount.PERCENTUAL}>
                  <Select.ItemText>Percentual</Select.ItemText>
                </Select.Item>
                <Select.Item value={TypeDiscount.LEVEMAISPAGUEMENOS}>
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
              {!loading &&
                filteredData[0] &&
                filteredData?.map((data: Discount) => (
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
                          : data.type == TypeDiscount.PERCENTUAL
                            ? data.type == TypeDiscount.PERCENTUAL
                            : 'NENHUM'}
                    </td>
                    <td className="px-6 py-4">
                      {data.activationDate != ''
                        ? data.activationDate
                        : 'Sem data'}
                    </td>
                    <td className="px-6 py-4">
                      {' '}
                      {data.desactivationDate != ''
                        ? data.desactivationDate
                        : 'Sem data'}
                    </td>
                    <td className="px-6 py-4">
                      <Switch
                        checked={data.activate}
                        onClick={(checked) => {
                          checked
                            ? activeDiscount(data.id)
                            : desativeDiscount(data.id)
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Dialog.Trigger asChild>
                        <Button
                          variant="ghost"
                          onClick={() => {
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
          {!loading && !filteredData[0] && (
            <div className="flex w-full flex-1 items-center justify-center pt-5">
              {' '}
              <p>{ErrorFormTypes.SEMDADOS}</p>
            </div>
          )}
          {loading && (
            <div className="flex w-full flex-1 items-center justify-center pt-5">
              {' '}
              <p>{ErrorFormTypes.CARREGANDO}</p>
            </div>
          )}
        </div>
      </div>
      <Modal discountSelected={discountSelected} />
    </Dialog.Root>
  )
}

export default DataTable
