import React, { createContext, useState, useContext, ReactNode } from 'react'

// Definindo o tipo para o estado do contexto
type SidebarContextType = {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

// Criando o contexto
const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

// Criando o provedor do contexto
export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    if (window.innerWidth < 700) {
      setIsSidebarOpen((prev) => !prev)
    }
  }

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

// Criando um hook personalizado para usar o contexto
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext)

  return context
}
