/* eslint-disable react/jsx-key */
'use client'
import React from 'react'
import DataTable from 'src/components/DataTable'
import { products, titles } from 'src/utils/dataMocked'

export default function App() {
  return (
    <div className="app">
      <div className="pb-6">
        <h1 className="text-grey-secondary text-3xl font-medium">
          Lista de descontos
        </h1>
        <p className="text-grey-primary text-sm">
          Loja: Super João - Nova loja online
        </p>
      </div>

      <DataTable columns={titles} data={products} />
    </div>
  )
}
