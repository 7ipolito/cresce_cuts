'use client'

import { api } from 'app/api/axios/axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Discount } from 'utils/DiscountProps'
import { ErrorFormTypes } from 'utils/erros.enum'
import { TypeDiscount } from 'utils/types.enum'

// Criando o contexto para o objeto Discount
interface DiscountContextType {
  getDiscounts: () => Discount[]
  setDiscount: (discount: Discount[], isFromApi: boolean) => void
  updateDiscount: (newDiscount: Discount) => void
  activeDiscount: (discountId: number) => void
  desativeDiscount: (discountId: number) => void
}

const DiscountContext = createContext<DiscountContextType>({
  getDiscounts: () => [],
  setDiscount: () => {},
  updateDiscount: () => [],
  activeDiscount: () => [],
  desativeDiscount: () => [],
})

// Componente provedor do contexto Discount
export const DiscountProvider: React.FC = ({ children }: any) => {
  const [discount, setDiscountState] = useState<Discount[]>([] as Discount[])

  async function loadData() {
    try {
      const response = await api.get('/products')
      const newDiscounts: Discount[] = []

      const dataResponse = response.data

      dataResponse.map(async (discount: any) => {
        const newData: Discount = {
          id: discount.id,
          title: discount.title,
          description: discount.description,
          activate: false,
          activationDate: '',
          desactivationDate: '',
          image: discount.image,
          price: 0,
          type: TypeDiscount.NENHUM,
        }
        newDiscounts.push(newData)
      })
      setDiscountState(newDiscounts)
      setDiscount(newDiscounts, true)
    } catch (error) {
      console.log(error)
    }
  }
  // Obtendo dados do localStorage ao carregar
  useEffect(() => {
    // try {
    //   if (discount[0].id) {
    //     alert('oi')
    //     setDiscountState(getDiscounts())
    //   }
    // } catch (error) {
    //   setDiscountState(getDiscounts())
    // }

    const loaded = localStorage.getItem('loadedFromApi')
    if (!loaded) {
      loadData()
    }

    // const updateData = () => {
    //   // Atualizacao dos dados a cada 30 segundos
    //   console.log(discount)

    //   if (discount[0]?.id) {
    //     console.log('Atualizando dados local storage..')
    //     localStorage.setItem('discount', JSON.stringify(discount))
    //   }
    // }

    // const intervalId = setInterval(updateData, 5000)

    // updateData()

    // return () => clearInterval(intervalId)
  }, [])

  function getDiscounts(): Discount[] {
    if (discount[0]?.id) {
      return discount
    } else {
      const localStorageDiscounts = localStorage.getItem('discount')
      const newlocalStorageDiscounts: Discount[] = localStorageDiscounts
        ? JSON.parse(localStorageDiscounts)
        : ''
      // console.log(newlocalStorageDiscounts)
      setDiscountState(newlocalStorageDiscounts)
      console.log(discount)
      return newlocalStorageDiscounts
    }
  }

  function updateDiscount(newDiscount: Discount) {
    const localStorageDiscounts = localStorage.getItem('discount')
    const newlocalStorageDiscounts: Discount[] = localStorageDiscounts
      ? JSON.parse(localStorageDiscounts)
      : ''
    newlocalStorageDiscounts.forEach((d: Discount, index) => {
      if (d.id === newDiscount.id) {
        newlocalStorageDiscounts[index] = newDiscount
      }
    })

    setDiscountState(newlocalStorageDiscounts)
  }

  function activeDiscount(discountId: number) {
    if (discount[0]?.id) {
      const newlocalStorageDiscounts = discount

      newlocalStorageDiscounts.forEach((d: Discount, index) => {
        console.log(discountId == d.id)

        if (d.id == discountId) {
          newlocalStorageDiscounts[index].activate = true
        }
      })
      setDiscount(newlocalStorageDiscounts, false)

      setDiscountState(newlocalStorageDiscounts)
      console.log(discount)
    } else {
      const localStorageDiscounts = localStorage.getItem('discount')
      const newlocalStorageDiscounts: Discount[] = localStorageDiscounts
        ? JSON.parse(localStorageDiscounts)
        : ''
      newlocalStorageDiscounts.forEach((d: Discount, index) => {
        if (d.id === discountId) {
          newlocalStorageDiscounts[index].activate = true
        }
      })
      setDiscount(newlocalStorageDiscounts, false)

      setDiscountState(newlocalStorageDiscounts)
    }
  }

  function desativeDiscount(discountId: number) {
    if (discount[0]?.id) {
      const newlocalStorageDiscounts = discount

      newlocalStorageDiscounts.forEach((d: Discount, index) => {
        console.log(discountId == d.id)

        if (d.id == discountId) {
          newlocalStorageDiscounts[index].activate = false
        }
      })
      console.log(newlocalStorageDiscounts)
      setDiscount(newlocalStorageDiscounts, false)

      setDiscountState(newlocalStorageDiscounts)
      console.log(discount)

      // console.log(newlocalStorageDiscounts)
    } else {
      const localStorageDiscounts = localStorage.getItem('discount')
      const newlocalStorageDiscounts: Discount[] = localStorageDiscounts
        ? JSON.parse(localStorageDiscounts)
        : ''
      newlocalStorageDiscounts.forEach((d: Discount, index) => {
        if (d.id === discountId) {
          newlocalStorageDiscounts[index].activate = false
        }
      })
      setDiscount(newlocalStorageDiscounts, false)
      setDiscountState(newlocalStorageDiscounts)
    }
  }

  const setDiscount = (newDiscounts: Discount[] | null, isFromApi: boolean) => {
    if (newDiscounts) {
      try {
        localStorage.setItem('discount', JSON.stringify(newDiscounts))
      } catch (error) {
        alert(error)
      }
      if (isFromApi) {
        localStorage.setItem('loadedFromApi', JSON.stringify(true))
      }
    }
  }

  return (
    <DiscountContext.Provider
      value={{
        updateDiscount,
        setDiscount,
        getDiscounts,
        activeDiscount,
        desativeDiscount,
      }}
    >
      {children}
    </DiscountContext.Provider>
  )
}

// Hook personalizado para acessar o contexto Discount
export const useDiscount = () => useContext(DiscountContext)
