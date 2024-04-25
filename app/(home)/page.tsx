/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
'use client'
import React, { useEffect, useState } from 'react'
import DataTable from 'components/DataTable'
import { discounts, titles } from 'utils/dataMocked'
import { useDiscount } from 'hooks/useDiscount'
import { Discount } from 'types/DiscountProps'

export default function App() {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const { getDiscounts } = useDiscount()

  useEffect(() => {
    setDiscounts(getDiscounts())
  }, [getDiscounts])
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
