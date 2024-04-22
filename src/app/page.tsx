/* eslint-disable react/jsx-key */
'use client'
import React from 'react'
import Switch from 'src/components/Switch'

export default function App() {
  const columns = [
    {
      name: 'Desconto',
      selector: (row) => (
        <img
          className="mt-1"
          src={row.image}
          alt="Logo do produto"
          width={50}
          height={50}
        />
      ),
    },
    {
      name: 'Tipo',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Data Ativação',
      selector: (row) => row.activationDate,
      sortable: true,
    },
    {
      name: 'Data Inativação',
      selector: (row) => row.desactivationDate,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <label className="inline-flex cursor-pointer items-center">
          <input type="checkbox" value="" className="peer sr-only" />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
        </label>
      ),
      sortable: true,
    },
  ]

  const title = [
    'Desconto',
    'Tipo',
    'Data ativação',
    'Data Inativação',
    'Status',
  ]

  const products = [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      type: 'Leve mais pague menos',
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
  ]

  return (
    <div className="App">
      <div className="relative w-full overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {title.map((title) => (
                <th key={title} scope="col" className="px-6 py-3">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <td className="px-10 py-4">
                  <img src={product.image} alt="Imagem do produto" width={30} />
                </td>

                <td className="px-6 py-4">{product.type}</td>
                <td className="px-6 py-4">{product.activationDate}</td>
                <td className="px-6 py-4">{product.desactivationDate}</td>
                <td className="px-6 py-4">
                  <Switch checked={product.activate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
