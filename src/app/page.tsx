/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
'use client'
import React from 'react'
import DataTable from 'src/components/DataTable'
import { discounts, titles } from 'src/utils/dataMocked'

export default function App() {
  return (
    <div className="app">
      <div className="pb-6">
        <h1 className="text-3xl font-medium text-grey-secondary">
          Lista de descontos
        </h1>
        <p className="text-sm text-grey-primary">
          Loja: Super João - Nova loja online
        </p>
      </div>

      <DataTable columns={titles} data={discounts} />
    </div>
  )
}
