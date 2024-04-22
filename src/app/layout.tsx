import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Sidebar } from 'src/components/Sidebar'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CresceVendas Gerenciador de Descontos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="lg:grid-cols-app relative min-h-screen lg:grid dark:bg-zinc-900">
          <Sidebar />

          <main className="max-w-screen px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
