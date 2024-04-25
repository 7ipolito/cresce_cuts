'use client'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import '../styles/globals.css'
import { Sidebar } from 'components/Sidebar'
import { DiscountProvider } from 'hooks/useDiscount'
import { SidebarProvider } from 'hooks/useSidebar'
import { ModalProvider } from 'hooks/useModal'

const rubik = Rubik({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'CresceVendas Gerenciador de Descontos',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <div className="relative min-h-screen lg:grid lg:grid-cols-app dark:bg-zinc-900">
          <DiscountProvider>
            <SidebarProvider>
              <ModalProvider>
                <Sidebar />

                <main className="max-w-screen mt-8 pb-12 pl-4 pr-4 pt-24 lg:col-start-2 lg:w-auto lg:p-0 lg:pr-4 lg:pt-8">
                  {children}
                </main>
              </ModalProvider>
            </SidebarProvider>
          </DiscountProvider>
        </div>
      </body>
    </html>
  )
}
