'use client'

import { Menu } from 'lucide-react'
import { Logo } from './Logo'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Button } from '../Button'
import { NavItem } from './Navigation/NavItem'
import { SidebarProvider, useSidebar } from 'hooks/useSidebar'

export function Sidebar() {
  const { isSidebarOpen } = useSidebar()

  return (
    <SidebarProvider>
      <Collapsible.Root
        className={`fixed left-0 ${isSidebarOpen ? 'hidden' : ''} right-0 top-0 z-20 flex flex-col  gap-6 overflow-hidden border-b border-zinc-200 bg-blue-primary p-4 scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 data-[state=open]:bottom-0  lg:bottom-0 lg:right-auto lg:h-auto lg:w-80 lg:max-w-64 lg:overflow-auto lg:border-b-0 lg:border-r lg:px-1 lg:py-8 dark:border-zinc-800 dark:bg-zinc-900`}
      >
        <div className="justify-betweenn flex items-center justify-between lg:justify-center">
          <Logo />
          <Collapsible.Trigger asChild className="lg:hidden">
            <Button variant="ghost">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content
          asChild
          forceMount
          className="data-[state=closed]:animate-slideUpAndFade data-[state=open]:animate-slideDownAndFade data-[state=closed]:hidden lg:data-[state=closed]:flex"
        >
          <div className="flex flex-1 flex-col gap-6">
            <nav className="flex flex-col gap-0.5">
              <NavItem title="Lista descontos" />
            </nav>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </SidebarProvider>
  )
}
