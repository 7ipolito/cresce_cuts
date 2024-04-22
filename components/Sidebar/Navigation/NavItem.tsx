import { ChevronRight } from 'lucide-react'

interface NavItemProps {
  title: string
}

export function NavItem({ title }: NavItemProps) {
  return (
    <a
      href=""
      className="group flex items-center gap-3 rounded px-3 py-2 text-xs outline-none  focus-visible:ring-2 focus-visible:ring-violet-500 "
    >
      <img src="/icon-money.png" />
      <span className=" text-white">{title}</span>
      <ChevronRight className="ml-auto h-7 w-7 font-bold text-white dark:text-zinc-600" />
    </a>
  )
}
