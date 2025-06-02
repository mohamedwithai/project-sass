'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  LayoutDashboard,
  Receipt,
  CreditCard,
  ArrowLeftRight,
  ChevronDown,
  ChevronRight,
  Settings,
  X
} from 'lucide-react'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    dashboard: false
  })

  const toggleExpanded = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebarOpen) return
      const sidebar = document.querySelector('#sidebar')
      if (!sidebar) return
      if (
        !sidebar.contains(target as Node) && 
        !document.querySelector('[aria-controls="sidebar"]')?.contains(target as Node)
      ) {
        setSidebarOpen(false)
      }
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [sidebarOpen, setSidebarOpen])

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [pathname, setSidebarOpen])

  return (
    <aside
      id="sidebar"
      className={cn(
        'fixed z-40 left-0 top-0 h-screen w-64 flex-shrink-0 bg-[var(--page-bg)] dark:bg-[#0f172a] transition-all duration-300 ease-in-out lg:static border-r border-[var(--border-soft)] dark:border-r-[#1d2939]',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--accent-primary)]">
              <LayoutDashboard className="h-6 w-6 text-[var(--accent-text-on-primary)]" />
            </div>
            <span className="text-lg font-semibold text-[var(--text-normal)]">TailAdmin</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="flex lg:hidden text-[var(--text-muted)] hover:bg-[var(--border-soft)]"
          >
            <X className="w-6 h-6" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <div className="px-6 py-4">
          <p className="text-xs font-medium text-[var(--text-muted)] tracking-wider">MENU</p>
        </div>

        {/* Sidebar content */}
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-1 px-4">
            {/* Dashboard Dropdown */}
            <NavDropdown
              text="Dashboard"
              icon={<LayoutDashboard className="h-5 w-5" />}
              expanded={expanded.dashboard}
              toggleExpanded={() => toggleExpanded('dashboard')}
              items={[
                { 
                  href: '/dashboard/receipts', 
                  text: 'Receipts',
                  icon: <Receipt className="h-5 w-5" />
                },
                { 
                  href: '/dashboard/payments', 
                  text: 'Payments',
                  icon: <CreditCard className="h-5 w-5" />
                },
                { 
                  href: '/dashboard/contra', 
                  text: 'Contra',
                  icon: <ArrowLeftRight className="h-5 w-5" />
                },
              ]}
              pathname={pathname}
            />

            {/* Settings Dropdown */}
            <NavDropdown
              text="Settings"
              icon={<Settings className="h-5 w-5" />}
              expanded={expanded.settings}
              toggleExpanded={() => setExpanded(prev => ({ ...prev, settings: !prev.settings }))}
              items={[
                {
                  href: '/dashboard/settings',
                  text: 'General Settings',
                  icon: <Settings className="h-5 w-5" />
                },
                {
                  href: '/dashboard/settings/security',
                  text: 'Security Settings',
                  icon: <Settings className="h-5 w-5" />
                }
              ]}
              pathname={pathname}
            />
          </nav>
        </ScrollArea>

        {/* Sidebar footer */}
        <div className="mt-auto p-4 border-t border-[var(--border-soft)]">
          <div className="flex items-center gap-3 rounded-lg bg-[var(--page-bg)] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-primary)] text-[var(--accent-text-on-primary)] font-semibold">
              JD
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-sm text-[var(--text-normal)]">John Doe</h5>
              <p className="text-xs text-[var(--text-muted)]">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

interface NavItemProps {
  href: string
  icon?: React.ReactNode
  text: string
  active?: boolean
  badge?: string
  isNew?: boolean
}

function NavItem({ href, icon, text, active, badge, isNew }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between rounded-lg px-4 py-2.5 text-sm leading-5 font-medium text-[var(--text-muted)] duration-300 ease-in-out hover:bg-[var(--border-soft)] hover:text-[var(--accent-primary)]",
        active && "bg-[var(--border-soft)] text-[var(--accent-primary)]"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{text}</span>
      </div>
      <div className="flex items-center gap-2">
        {isNew && (
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[var(--accent-primary)] text-[var(--accent-text-on-primary)] rounded">NEW</span>
        )}
        {badge && (
          <span className="px-2 py-0.5 text-[10px] font-medium bg-[var(--input-bg)] text-[var(--accent-primary)] rounded">{badge}</span>
        )}
      </div>
    </Link>
  )
}

interface NavDropdownProps {
  text: string
  icon: React.ReactNode
  expanded: boolean
  toggleExpanded: () => void
  items: { href: string; text: string; icon?: React.ReactNode }[]
  pathname: string
}

function NavDropdown({ text, icon, expanded, toggleExpanded, items, pathname }: NavDropdownProps) {
  const isActive = items.some(item => item.href === pathname)

  return (
    <div>
      <button
        onClick={toggleExpanded}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm leading-5 font-medium text-[var(--text-muted)] duration-300 ease-in-out hover:bg-[var(--border-soft)] hover:text-[var(--accent-primary)]",
          (expanded || isActive) && "bg-[var(--border-soft)] text-[var(--accent-primary)]"
        )}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{text}</span>
        </div>
        <ChevronRight className={cn(
          "h-4 w-4 transition-transform duration-200",
          expanded && "rotate-90"
        )} />
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        expanded ? "mt-1 ml-4 opacity-100" : "h-0 opacity-0"
      )}>
        <div className="space-y-1">
          {items.map((item, index) => (
            <NavItem
              key={index}
              href={item.href}
              icon={item.icon}
              text={item.text}
              active={item.href === pathname}
            />
          ))}
        </div>
      </div>
    </div>
  )
}