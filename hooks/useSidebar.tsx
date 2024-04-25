import React, { createContext, useState, useContext, ReactNode } from 'react'

interface SidebarContextProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}
const initialSideBarContext: SidebarContextProps = {
  isSidebarOpen: false,
  toggleSidebar: () => {},
}
const SidebarContext = createContext<SidebarContextProps>(initialSideBarContext)

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

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext)

  return context
}
