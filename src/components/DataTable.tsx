/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React from 'react'
import { Button } from './Button'
import Switch from './Switch'
import * as Select from '../components/Form/Select'

type DataTableProps = { columns: any[]; data: any[] }
const DataTable = ({ columns, data }: DataTableProps) => {
  return (
    <div className="rounded-md bg-white px-4 py-6">
      <div className="w-100 flex items-center justify-between pb-6">
        <h2 className="text-grey-primary text-xl font-thin">
          Descontos cadastrados
        </h2>
        <Button>Novo Desconto</Button>
      </div>
      <div className="w-100 flex flex-col items-center gap-2 pb-6 lg:flex-row lg:justify-between">
        <div className="w-full">
          <p className="text-grey-secondary text-sm">Status</p>
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
          <p className="text-grey-secondary text-sm">Tipo desconto</p>
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
            {data.map((data: any) => (
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <td className="px-14 py-4">
                  <div className="flex flex-row items-center">
                    <div className="bg-red w-20">
                      <img src={data.image} alt="Imagem do produto" />
                    </div>
                    <p className="ml-4">{data.title}</p>
                  </div>
                </td>

                <td className="px-6 py-4">{data.type}</td>
                <td className="px-6 py-4">{data.activationDate}</td>
                <td className="px-6 py-4">{data.desactivationDate}</td>
                <td className="px-6 py-4">
                  <Switch checked={data.activate} />
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost">
                    <img src="/eye.png" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
