'use client'

import { api } from 'app/api/axios/axios'
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Discount } from 'types/DiscountProps'
import { TypeDiscount } from 'enums/types.enum'

interface DiscountContextType {
  getDiscounts: () => Discount[]
  setDiscount: (discount: Discount[], isFromApi: boolean) => void
  updateDiscount: (newDiscount: Discount) => void
  createDiscount: (newDiscount: Discount) => void
  activeDiscount: (discountId: string) => void
  desativeDiscount: (discountId: string) => void
}

const DiscountContext = createContext<DiscountContextType>({
  getDiscounts: () => [],
  setDiscount: () => {},
  updateDiscount: () => [],
  createDiscount: () => [],
  activeDiscount: () => [],
  desativeDiscount: () => [],
})

interface DiscountProviderProps {
  children: ReactNode
}

export const DiscountProvider = ({ children }: DiscountProviderProps) => {
  const [discount, setDiscountState] = useState<Discount[]>([] as Discount[])

  function convertDataToJson(): Discount[] {
    const localStorageDiscounts = localStorage.getItem('discount')
    return localStorageDiscounts ? JSON.parse(localStorageDiscounts) : ''
  }

  const loadData = useCallback(async () => {
    try {
      const response = await api.get('/products')
      const dataResponse = response.data

      const newDiscounts = await Promise.all(
        dataResponse.map(async (discount: any) => {
          const newData: Discount = {
            id: uuidv4(),
            title: discount.title,
            description: discount.description,
            activate: false,
            activationDate: '',
            desactivationDate: '',
            image: discount.image,
            price: 0,
            type: TypeDiscount.NENHUM,
          }
          return newData
        }),
      )

      setDiscountState(newDiscounts)
      setDiscount(newDiscounts, true)
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    const loaded = localStorage.getItem('loadedFromApi')
    if (!loaded) {
      loadData()
    }
  }, [loadData])

  function getDiscounts(): Discount[] {
    if (discount[0]?.id) {
      return discount
    } else {
      const newlocalStorageDiscounts: Discount[] = convertDataToJson()
      setDiscountState(newlocalStorageDiscounts)
      return newlocalStorageDiscounts
    }
  }

  function updateDiscount(newDiscount: Discount) {
    const newlocalStorageDiscounts = convertDataToJson()
    newlocalStorageDiscounts.forEach((d: Discount, index) => {
      if (d.id === newDiscount.id) {
        newlocalStorageDiscounts[index] = newDiscount
      }
    })

    setDiscountState(newlocalStorageDiscounts)
  }

  function createDiscount(newDiscount: Discount) {
    const newlocalStorageDiscounts = convertDataToJson()
    const newListDiscounts = [...newlocalStorageDiscounts, newDiscount]
    newListDiscounts.splice(0, 0, newDiscount)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newListDiscounts.sort((a: any, b: any) => a - b)

    setDiscountState(newListDiscounts)
    setDiscount(newListDiscounts, false)
  }

  function activeDiscount(discountId: string) {
    if (discount[0]?.id) {
      const newlocalStorageDiscounts = discount

      newlocalStorageDiscounts.forEach((d: Discount, index) => {
        if (d.id == discountId) {
          newlocalStorageDiscounts[index].activate = true
        }
      })
      setDiscount(newlocalStorageDiscounts, false)

      setDiscountState(newlocalStorageDiscounts)
    } else {
      const newlocalStorageDiscounts = convertDataToJson()
      newlocalStorageDiscounts.forEach((d: Discount, index) => {
        if (d.id === discountId) {
          newlocalStorageDiscounts[index].activate = true
        }
      })
      setDiscount(newlocalStorageDiscounts, false)

      setDiscountState(newlocalStorageDiscounts)
    }
  }

  function desativeDiscount(discountId: string) {
    if (discount[0]?.id) {
      const newlocalStorageDiscounts = discount

      newlocalStorageDiscounts.forEach((d: Discount, index) => {
        if (d.id == discountId) {
          newlocalStorageDiscounts[index].activate = false
        }
      })
      setDiscount(newlocalStorageDiscounts, false)

      setDiscountState(newlocalStorageDiscounts)
    } else {
      const newlocalStorageDiscounts = convertDataToJson()

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
        createDiscount,
      }}
    >
      {children}
    </DiscountContext.Provider>
  )
}

export const useDiscount = () => useContext(DiscountContext)
