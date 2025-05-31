'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Receipt, CreditCard, ArrowLeftRight, Settings } from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    isExpandable: true
  },
  {
    title: 'Receipts',
    href: '/dashboard/receipts',
    icon: Receipt,
    isExpandable: false
  },
  {
    title: 'Payments',
    href: '/dashboard/payments',
    icon: CreditCard,
    isExpandable: false
  },
  {
    title: 'Contra',
    href: '/dashboard/contra',
    icon: ArrowLeftRight,
    isExpandable: false
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    isExpandable: false
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-hidden bg-[#0B1120] duration-300 ease-linear">
      {/* Menu Header */}
      <div className="flex items-center px-4 py-3 text-[#64748B]">
        <span className="text-xs font-medium">MENU</span>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="py-2 px-4">
          <div>
            <ul className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-lg py-2 px-4 font-medium duration-300 ease-in-out',
                      pathname === item.href 
                        ? 'text-[#3B82F6] bg-[#1E293B]' 
                        : 'text-[#64748B] hover:text-[#3B82F6] hover:bg-[#1E293B]'
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      pathname === item.href 
                        ? 'text-[#3B82F6]' 
                        : 'text-[#64748B] group-hover:text-[#3B82F6]'
                    )} />
                    {item.title}
                    {item.isExpandable && (
                      <svg
                        className={cn(
                          "absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-current",
                          pathname === item.href ? 'text-[#3B82F6]' : 'text-[#64748B]'
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
} 