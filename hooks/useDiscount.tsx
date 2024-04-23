'use client'

import { api } from 'app/api/axios/axios'
import React, { createContext, useContext, useEffect } from 'react'
import { Discount } from 'utils/DiscountProps'
import { TypeDiscount } from 'utils/types.enum'

// Criando o contexto para o objeto Discount
interface DiscountContextType {
  getDiscounts: () => Discount[]
  setDiscount: (discount: Discount[], isFromApi: boolean) => void
  updateDiscount: (discount: Discount, newDiscount: Discount) => Discount[]
  changeDiscountStatus: (discount: Discount) => Discount[]
}

const DiscountContext = createContext<DiscountContextType>({
  getDiscounts: () => [],
  setDiscount: () => {},
  updateDiscount: () => [],
  changeDiscountStatus: () => [],
})

// Componente provedor do contexto Discount
export const DiscountProvider: React.FC = ({ children }: any) => {
  // const [discount, setDiscountState] = useState<Discount[] | null>(null)

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
      setDiscount(newDiscounts, true)
    } catch (error) {
      console.log(error)
    }
  }
  // Obtendo dados do localStorage ao carregar
  useEffect(() => {
    const loaded = localStorage.getItem('loadedFromApi')
    if (!loaded) {
      loadData()
    }
    // updateDiscount(
    //   {
    //     id: 1,
    //     title: 'Bolsa',
    //     price: 109.95,
    //     priceBefore: 109.95,
    //     priceWithDiscount: 99.0,
    //     type: TypeDiscount.DEPOR,
    //     activationDate: '22/04/2026',
    //     desactivationDate: '22/04/2026',
    //     activate: true,
    //     description:
    //       'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    //     image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    //   },
    //   {
    //     id: 1,
    //     title: 'Bolsa Teste',
    //     price: 109.95,
    //     priceBefore: 109.95,
    //     priceWithDiscount: 99.0,
    //     type: TypeDiscount.DEPOR,
    //     activationDate: '22/04/2026',
    //     desactivationDate: '22/04/2026',
    //     activate: true,
    //     description:
    //       'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    //     image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    //   },
    // )
  }, [])

  function getDiscounts(): Discount[] {
    const localStorageDiscounts = localStorage.getItem('discount')
    const newlocalStorageDiscounts: Discount[] = localStorageDiscounts
      ? JSON.parse(localStorageDiscounts)
      : ''
    console.log(newlocalStorageDiscounts)

    return newlocalStorageDiscounts
  }

  function updateDiscount(discount: Discount, newDiscount: Discount) {
    const localStorageDiscounts = localStorage.getItem('discount')
    const newlocalStorageDiscounts: Discount[] = localStorageDiscounts
      ? JSON.parse(localStorageDiscounts)
      : ''
    newlocalStorageDiscounts.forEach((d: Discount, index) => {
      if (d.id === newDiscount.id) {
        newlocalStorageDiscounts[index] = newDiscount
      }
    })

    return newlocalStorageDiscounts
  }

  function changeDiscountStatus(discount: Discount) {
    const localStorageDiscounts = localStorage.getItem('discount')
    const newlocalStorageDiscounts: Discount[] = localStorageDiscounts
      ? JSON.parse(localStorageDiscounts)
      : ''
    newlocalStorageDiscounts.forEach((d: Discount, index) => {
      if (d.id === discount.id) {
        newlocalStorageDiscounts[index].activate = !d.activate
      }
    })

    return newlocalStorageDiscounts
  }

  const setDiscount = (newDiscounts: Discount[] | null, isFromApi: boolean) => {
    if (newDiscounts) {
      localStorage.setItem('discount', JSON.stringify(newDiscounts))
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
        changeDiscountStatus,
      }}
    >
      {children}
    </DiscountContext.Provider>
  )
}

// Hook personalizado para acessar o contexto Discount
export const useDiscount = () => useContext(DiscountContext)
