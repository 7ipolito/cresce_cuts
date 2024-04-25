import React, { createContext, useState, useContext, ReactNode } from 'react'

interface ModalContextProps {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const initialModalContext: ModalContextProps = {
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
}

interface ModalProviderProps {
  children: ReactNode
}

const ModalContext = createContext<ModalContextProps>(initialModalContext)

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)

  return context
}
