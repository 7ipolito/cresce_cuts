import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react'

// Definindo a interface do objeto Rating
interface Rating {
  rate: number
  count: number
}

// Definindo a interface do objeto Discount
export interface Discount {
  id: number
  title: string
  price: number
  take?: number
  pay?: number
  percentDiscount?: number
  priceWithDiscount?: number
  priceBefore?: number
  discountText?: string
  type: string // Alterei para 'string' pois TypeDiscount não está definido
  activationDate: string
  desactivationDate: string
  activate: boolean
  description: string
  category: string
  image: string
  rating: Rating
}

// Criando o contexto para o objeto Discount
interface DiscountContextType {
  discount: Discount | null
  setDiscount: (discount: Discount | null) => void
}

const DiscountContext = createContext<DiscountContextType>({
  discount: null,
  setDiscount: () => {},
})

// Componente provedor do contexto Discount
export const DiscountProvider: React.FC = ({ children }: any) => {
  const [discount, setDiscountState] = useState<Discount | null>(null)

  // Obtendo dados do localStorage ao carregar
  useEffect(() => {
    const savedDiscount = localStorage.getItem('discount')
    if (savedDiscount) {
      setDiscountState(JSON.parse(savedDiscount))
    }
  }, [])

  // Atualizando o localStorage sempre que o desconto mudar
  const setDiscount = (newDiscount: Discount | null) => {
    if (newDiscount) {
      localStorage.setItem('discount', JSON.stringify(newDiscount))
    } else {
      localStorage.removeItem('discount')
    }
    setDiscountState(newDiscount)
  }

  return (
    <DiscountContext.Provider value={{ discount, setDiscount }}>
      {children}
    </DiscountContext.Provider>
  )
}

// Hook personalizado para acessar o contexto Discount
export const useDiscount = () => useContext(DiscountContext)
