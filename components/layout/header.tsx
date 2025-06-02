'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Bell, 
  Search, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  Sun, 
  Moon 
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  isMobile: boolean
}

export default function Header({ sidebarOpen, setSidebarOpen, isMobile }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex w-full bg-white border-b border-slate-200 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
              aria-controls="sidebar"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="w-6 h-6" />
            </Button>
          )}
          
          <div className="hidden md:block">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[280px] bg-slate-50 border-slate-300 dark:bg-slate-800 dark:border-slate-700"
            />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-72 overflow-y-auto">
                {[...Array(3)].map((_, i) => (
                  <DropdownMenuItem key={i} className="py-2 cursor-pointer">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 flex-shrink-0">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New order received</p>
                        <p className="text-xs text-muted-foreground">
                          Order #1234 has been placed
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="w-full flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile search */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 md:hidden">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-slate-50 border-slate-300 dark:bg-slate-800 dark:border-slate-700"
          />
        </div>
      )}
    </header>
  )
}