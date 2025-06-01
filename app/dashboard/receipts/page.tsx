'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Search, Download, Trash2, PenLine, Calendar, Loader2, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { debounce } from 'lodash'

interface User {
  id: number
  name: string
  email: string
  position: string
  salary: number
  office: string
  status: 'Hired' | 'In Progress' | 'Pending'
}

interface Receipt {
  slNo: number
  date: string
  bankCashCategory: string
  accountCategory: string
  ledgerCategory: string
  Account_Type: string
  events: string
  donar: string
  description: string
  source: string
  amount: string
}

// const users: User[] = [
//   {
//     id: 1,
//     name: 'Lindsey Curtis',
//     email: 'demoemail@gmail.com',
//     position: 'Sales Assistant',
//     salary: 89500,
//     office: 'Edinburgh',
//     status: 'Hired'
//   },
//   {
//     id: 2,
//     name: 'Kaiya George',
//     email: 'demoemail@gmail.com',
//     position: 'Chief Executive Officer',
//     salary: 105000,
//     office: 'London',
//     status: 'In Progress'
//   },
//   {
//     id: 3,
//     name: 'Zain Geidt',
//     email: 'demoemail@gmail.com',
//     position: 'Junior Technical Author',
//     salary: 120000,
//     office: 'San Francisco',
//     status: 'In Progress'
//   },
//   {
//     id: 4,
//     name: 'Abram Schleifer',
//     email: 'demoemail@gmail.com',
//     position: 'Software Engineer',
//     salary: 95000,
//     office: 'New York',
//     status: 'Hired'
//   },
//   {
//     id: 5,
//     name: 'Carla George',
//     email: 'demoemail@gmail.com',
//     position: 'Integration Specialist',
//     salary: 80000,
//     office: 'Chicago',
//     status: 'Pending'
//   }
// ]

const handleError = (error: any) => {
  if (error.response) {
    const data = error.response.json();
    if (data.error) {
      toast.error(`Error: ${data.error}${data.details ? ` - ${data.details}` : ''}`);
      if (data.fields) {
        toast.error(`Missing fields: ${data.fields.join(', ')}`);
      }
    } else {
      toast.error('An unexpected error occurred');
    }
  } else if (error.message) {
    toast.error(`Error: ${error.message}`);
  } else {
    toast.error('An unexpected error occurred');
  }
};

export default function ReceiptsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [entriesPerPage, setEntriesPerPage] = useState('5')
  const [currentPage, setCurrentPage] = useState(1)
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const mountedRef = useRef(false)
  const [formData, setFormData] = useState({
    date: '',
    bankCashCategory: '',
    accountCategory: '',
    ledgerCategory: '',
    Account_Type: '',
    events: '',
    donar: '',
    description: '',
    source: '',
    amount: ''
  })
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Receipt | null;
    direction: 'asc' | 'desc' | null;
  }>({
    key: null,
    direction: null
  });
  const [accountCategories, setAccountCategories] = useState<string[]>([])
  const [bankCashCategories, setBankCashCategories] = useState<string[]>([])
  const [ledgerCategories, setLedgerCategories] = useState<string[]>([])
  const [accountTypes, setAccountTypes] = useState<string[]>([])
  const [eventsList, setEventsList] = useState<string[]>([])
  const [donarTypes, setDonarTypes] = useState<string[]>([])
  const [sourceTypes, setSourceTypes] = useState<string[]>([])

  // Add mounted ref to prevent state updates after unmount
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  // Safe state update function with proper typing
  const safeSetState = <T,>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    value: T | ((prev: T) => T)
  ): void => {
    if (mountedRef.current) {
      setter(value)
    }
  }

  // Type-safe state setters
  const setLoadingState = (value: boolean) => safeSetState(setLoading, value)
  const setErrorState = (value: string | null) => safeSetState(setError, value)
  const setCurrentPageState = (value: number) => safeSetState(setCurrentPage, value)
  const setEntriesPerPageState = (value: string) => safeSetState(setEntriesPerPage, value)
  const setSortConfigState = (value: typeof sortConfig) => safeSetState(setSortConfig, value)
  const setReceiptsState = (value: Receipt[] | ((prev: Receipt[]) => Receipt[])) => safeSetState(setReceipts, value)
  const setFormDataState = (value: typeof formData) => safeSetState(setFormData, value)

  // Add search filter function
  const filteredReceipts = React.useMemo(() => {
    if (!searchTerm) return receipts

    const searchLower = searchTerm.toLowerCase()
    return receipts.filter((receipt) => (
      receipt.slNo.toString().includes(searchLower) ||
      receipt.date.toLowerCase().includes(searchLower) ||
      receipt.bankCashCategory.toLowerCase().includes(searchLower) ||
      receipt.accountCategory.toLowerCase().includes(searchLower) ||
      receipt.ledgerCategory.toLowerCase().includes(searchLower) ||
      receipt.Account_Type.toLowerCase().includes(searchLower) ||
      receipt.events.toLowerCase().includes(searchLower) ||
      receipt.donar.toLowerCase().includes(searchLower) ||
      receipt.description.toLowerCase().includes(searchLower) ||
      receipt.source.toLowerCase().includes(searchLower) ||
      receipt.amount.toLowerCase().includes(searchLower)
    ))
  }, [receipts, searchTerm])

  // Update pagination calculations
  const pageSize = parseInt(entriesPerPage)
  const totalPages = Math.ceil(filteredReceipts.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  // Debounced search to prevent rapid API calls
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (mountedRef.current) {
        setSearchTerm(value)
        setCurrentPageState(1)
      }
    }, 300),
    []
  )

  // Handle page change with type-safe setter
  const handlePageChange = (page: number) => {
    setCurrentPageState(page)
  }

  // Handle entries per page change with type-safe setter
  const handleEntriesPerPageChange = (value: string) => {
    setEntriesPerPageState(value)
    setCurrentPageState(1)
  }

  // Add sort function with type-safe setter
  const handleSort = (key: keyof Receipt) => {
    let direction: 'asc' | 'desc' | null = 'asc'
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') direction = 'desc'
      else if (sortConfig.direction === 'desc') direction = null
    }

    setSortConfigState({ key, direction })
  }

  // Sort receipts from filtered results
  const sortedReceipts = React.useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredReceipts

    return [...filteredReceipts].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [filteredReceipts, sortConfig])

  const displayedReceipts = sortedReceipts.slice(startIndex, endIndex)

  // Modified search handler with debounce
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }, [debouncedSearch])

  // Fetch receipts with type-safe setters
  const fetchReceipts = async () => {
    if (abortController) {
      abortController.abort()
    }
    
    const controller = new AbortController()
    setAbortController(controller)
    
    try {
      setLoadingState(true)
      setErrorState(null)
      
      const timeoutId = setTimeout(() => {
        if (mountedRef.current && controller && !controller.signal.aborted) {
          controller.abort()
          setErrorState('Request timed out. Please try again.')
          setLoadingState(false)
        }
      }, 30000)

      const response = await fetch('/api/receipts', {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      clearTimeout(timeoutId)

      if (!mountedRef.current) return

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || error.error || 'Failed to fetch receipts')
      }
      
      const data = await response.json()
      setReceiptsState(data)
    } catch (error: any) {
      if (!mountedRef.current) return
      
      if (error.name !== 'AbortError') {
        console.error('Error fetching receipts:', {
          error,
          message: error.message,
          stack: error.stack,
          type: error.name
        })
        setErrorState(error.message)
        handleError(error)
      }
    } finally {
      if (mountedRef.current && !controller.signal.aborted) {
        setTimeout(() => {
          setLoadingState(false)
        }, 500)
      }
    }
  }

  // Modified form submit with type-safe setters
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const controller = new AbortController()
    
    try {
      setLoadingState(true)
      setErrorState(null)
      
      const response = await fetch('/api/receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      })

      if (!mountedRef.current) return

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || error.error || 'Failed to add receipt')
      }
      
      const newReceipt = await response.json()
      setReceiptsState(prev => [...prev, newReceipt])
      toast.success('Receipt added successfully')
      
      // Reset form
      setFormDataState({
        date: '',
        bankCashCategory: '',
        accountCategory: '',
        ledgerCategory: '',
        Account_Type: '',
        events: '',
        donar: '',
        description: '',
        source: '',
        amount: ''
      })
    } catch (error: any) {
      if (!mountedRef.current) return

      if (error.name !== 'AbortError') {
        console.error('Error adding receipt:', error)
        setErrorState(error.message)
        handleError(error)
      }
    } finally {
      if (mountedRef.current && !controller.signal.aborted) {
        setLoadingState(false)
      }
    }

    return () => controller.abort()
  }

  // Modified delete handler with type-safe setters
  const handleDelete = async (slNo: number) => {
    if (!confirm('Are you sure you want to delete this receipt?')) {
      return
    }

    const controller = new AbortController()

    try {
      setLoadingState(true)
      setErrorState(null)
      
      const response = await fetch('/api/receipts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ slNo }),
        signal: controller.signal
      })

      if (!mountedRef.current) return

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || error.error || 'Failed to delete receipt')
      }
      
      setReceiptsState(prev => prev.filter(receipt => receipt.slNo !== slNo))
      toast.success('Receipt deleted successfully')
    } catch (error: any) {
      if (!mountedRef.current) return

      if (error.name !== 'AbortError') {
        console.error('Error deleting receipt:', error)
        setErrorState(error.message)
        handleError(error)
      }
    } finally {
      if (mountedRef.current && !controller.signal.aborted) {
        setLoadingState(false)
      }
    }

    return () => controller.abort()
  }

  // Modified edit handler with type-safe setters
  const handleEdit = async (receipt: Receipt) => {
    const controller = new AbortController()

    try {
      setLoadingState(true)
      setErrorState(null)
      
      const response = await fetch('/api/receipts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(receipt),
        signal: controller.signal
      })

      if (!mountedRef.current) return

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || error.error || 'Failed to update receipt')
      }
      
      const updatedReceipt = await response.json()
      setReceiptsState(prev => prev.map(r => r.slNo === receipt.slNo ? updatedReceipt : r))
      toast.success('Receipt updated successfully')
    } catch (error: any) {
      if (!mountedRef.current) return

      if (error.name !== 'AbortError') {
        console.error('Error updating receipt:', error)
        setErrorState(error.message)
        handleError(error)
      }
    } finally {
      if (mountedRef.current && !controller.signal.aborted) {
        setLoadingState(false)
      }
    }

    return () => controller.abort()
  }

  // Add cleanup on unmount with additional safeguards
  useEffect(() => {
    return () => {
      if (abortController) {
        try {
          abortController.abort()
        } catch (error) {
          console.error('Error during cleanup:', error)
        }
      }
    }
  }, [])

  // Load receipts on mount with error boundary and type-safe setters
  useEffect(() => {
    let mounted = true
    
    const loadData = async () => {
      try {
        if (mounted) {
          await fetchReceipts()
        }
      } catch (error) {
        console.error('Error in initial load:', error)
        if (mounted) {
          setErrorState('Failed to load initial data')
        }
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [])

  // Fetch dropdown options
  const fetchDropdownOptions = async () => {
    try {
      const response = await fetch('/api/settings');
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      
      setBankCashCategories(data.bankCashCategories);
      setAccountCategories(data.accountCategories);
      setLedgerCategories(data.ledgerCategories);
      setAccountTypes(data.accountTypes);
      setEventsList(data.events);
      setDonarTypes(data.donarTypes);
      setSourceTypes(data.sourceTypes);
    } catch (error) {
      console.error('Error fetching dropdown options:', error);
      handleError(error);
    }
  };

  // Load dropdown options on mount
  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  // Add error boundary component
  class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
      super(props)
      this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
      return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/50">
            <p className="text-sm text-red-600 dark:text-red-200">
              Something went wrong. Please refresh the page.
            </p>
          </div>
        )
      }

      return this.props.children
    }
  }

  // Wrap the return JSX with error boundary
  return (
    <ErrorBoundary>
      <div className="w-full space-y-6">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/50">
            <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
          </div>
        )}
        
        {/* Receipt Entry Form */}
        <div className="rounded-lg border border-gray-200 dark:border-[#2E3A4D] bg-white dark:bg-[#0F1824]">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Receipt Entry</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-900 dark:text-white">Date</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 dark:text-[#8A99AF]" />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <Label htmlFor="bankCashCategory" className="text-gray-900 dark:text-white">Bank/Cash Category</Label>
                  <Select
                    value={formData.bankCashCategory}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, bankCashCategory: value }))}
                  >
                    <SelectTrigger className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D]">
                      {bankCashCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountCategory" className="text-gray-900 dark:text-white">Account Category</Label>
                  <Select
                    value={formData.accountCategory}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, accountCategory: value }))}
                  >
                    <SelectTrigger className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D]">
                      {accountCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ledgerCategory" className="text-gray-900 dark:text-white">Ledger Category</Label>
                  <Select
                    value={formData.ledgerCategory}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, ledgerCategory: value }))}
                  >
                    <SelectTrigger className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D]">
                      {ledgerCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="Account_Type" className="text-gray-900 dark:text-white">Account Type</Label>
                  <Select
                    value={formData.Account_Type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, Account_Type: value }))}
                  >
                    <SelectTrigger className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D]">
                      {accountTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="events" className="text-gray-900 dark:text-white">Events</Label>
                  <Select
                    value={formData.events}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, events: value }))}
                  >
                    <SelectTrigger className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D]">
                      {eventsList.map((event) => (
                        <SelectItem key={event} value={event}>
                          {event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donar" className="text-gray-900 dark:text-white">Donar</Label>
                  <Select
                    value={formData.donar}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, donar: value }))}
                  >
                    <SelectTrigger className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select donar" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D]">
                      {donarTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description" className="text-gray-900 dark:text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white min-h-[100px] resize-none focus:ring-2 focus:ring-[#3C50E0] focus:border-transparent"
                    placeholder="Enter description here..."
                  />
                </div>

                {/* Source and Amount */}
                <div className="space-y-2">
                  <Label htmlFor="source" className="text-gray-900 dark:text-white">Source</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}
                  >
                    <SelectTrigger className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D]">
                      {sourceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-gray-900 dark:text-white">Amount</Label>
                  <Input
                    id="amount"
                    type="text"
                    value={formData.amount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setFormData(prev => ({ 
                        ...prev, 
                        amount: value
                      }));
                    }}
                    className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white"
                    placeholder="Enter amount (e.g., 19000.00)"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#3C50E0] text-white hover:bg-[#3C50E0]/90"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Receipt Entry'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Existing table component */}
        <div className="rounded-lg border border-[#2E3A4D] bg-[#0F1824]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Receipts</h2>
                <p className="text-sm font-normal pt-1 text-[#8A99AF]">view and manage all your receipts.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A99AF]" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-[300px] pl-9 bg-[#1C2434] border-[#2E3A4D] text-white placeholder:text-[#8A99AF] rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-[#8A99AF]">Show</span>
              <Select
                value={entriesPerPage}
                onValueChange={handleEntriesPerPageChange}
              >
                <SelectTrigger className="w-[70px] bg-[#1C2434] border-[#2E3A4D] text-white rounded-lg">
                  <SelectValue placeholder="5" />
                </SelectTrigger>
                <SelectContent className="bg-[#1C2434] border-[#2E3A4D] rounded-lg max-h-[200px]">
                  {Array.from({ length: 10 }, (_, i) => (i + 1) * 5).map((value) => (
                    <SelectItem 
                      key={value} 
                      value={value.toString()}
                      className="text-white hover:bg-[#2E3A4D]"
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-[#8A99AF]">entries</span>
            </div>

            <div className="border border-[#2E3A4D] rounded-lg overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 bg-[#1C2434]">
                  <Loader2 className="h-10 w-10 animate-spin text-[#8A99AF]" />
                  <p className="mt-4 text-sm text-[#8A99AF]">Loading receipts...</p>
                </div>
              ) : sortedReceipts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 bg-[#1C2434]">
                  <p className="text-sm text-[#8A99AF]">No receipts found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#1C2434] border-b border-[#2E3A4D]">
                        <th className="w-[30px] px-4 py-4 border-r border-[#2E3A4D]">
                          <input type="checkbox" className="rounded border-[#2E3A4D]" />
                        </th>
                        {[
                          { key: 'slNo', label: 'Sl No' },
                          { key: 'date', label: 'Date' },
                          { key: 'bankCashCategory', label: 'Bank/Cash' },
                          { key: 'accountCategory', label: 'Account' },
                          { key: 'ledgerCategory', label: 'Ledger' },
                          { key: 'Account_Type', label: 'Account Type' },
                          { key: 'events', label: 'Events' },
                          { key: 'donar', label: 'Donar' },
                          { key: 'description', label: 'Description' },
                          { key: 'source', label: 'Source' },
                          { key: 'amount', label: 'Amount' }
                        ].map(({ key, label }) => (
                          <th key={key} className="px-4 py-4 text-left border-r border-[#2E3A4D]">
                            <button 
                              onClick={() => handleSort(key as keyof Receipt)}
                              className="flex items-center gap-1 text-[12px] leading-[18px] font-medium text-[#8A99AF] hover:text-white"
                            >
                              {label}
                              <ArrowUpDown className="h-4 w-4" />
                            </button>
                          </th>
                        ))}
                        <th className="px-4 py-4 text-left">
                          <span className="text-[12px] leading-[18px] font-medium text-[#8A99AF]">
                            Action
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedReceipts.map((receipt) => (
                        <tr key={receipt.slNo} className="border-b border-[#2E3A4D] bg-[#1C2434] hover:bg-[#2E3A4D]/50">
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <input type="checkbox" className="rounded border-[#2E3A4D]" />
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.slNo}</p>
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.date}</p>
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.bankCashCategory}</p>
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.accountCategory}</p>
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.ledgerCategory}</p>
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.Account_Type}</p>
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.events}</p>
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.donar}</p>
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.description}</p>
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.source}</p>
                          </td>
                          <td className="px-4 py-5 border-r border-[#2E3A4D]">
                            <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">
                              ₹{receipt.amount}
                            </p>
                          </td>
                          <td className="px-4 py-5">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 dark:text-[#8A99AF] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D] rounded-lg"
                                onClick={() => handleDelete(receipt.slNo)}
                                disabled={loading}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 dark:text-[#8A99AF] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D] rounded-lg"
                                onClick={() => handleEdit(receipt)}
                                disabled={loading}
                              >
                                <PenLine className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-[#8A99AF]">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Calculating entries...
                  </span>
                ) : (
                  `Showing ${sortedReceipts.length > 0 ? startIndex + 1 : 0} to ${Math.min(endIndex, sortedReceipts.length)} of ${sortedReceipts.length} entries`
                )}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="border-[#2E3A4D] text-[#8A99AF] hover:bg-[#2E3A4D] disabled:opacity-50 rounded-lg"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Show first page, last page, current page, and pages around current page
                    const nearCurrent = Math.abs(page - currentPage) <= 1;
                    const isFirstPage = page === 1;
                    const isLastPage = page === totalPages;
                    return nearCurrent || isFirstPage || isLastPage;
                  })
                  .map((page, index, array) => {
                    // Add ellipsis between non-consecutive pages
                    if (index > 0 && array[index - 1] !== page - 1) {
                      return (
                        <React.Fragment key={`ellipsis-${page}`}>
                          <span className="text-[#8A99AF] px-2">...</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={cn(
                              "min-w-[36px] border-[#2E3A4D] hover:bg-[#2E3A4D] rounded-lg",
                              currentPage === page ? "bg-[#1C2434] text-white" : "text-[#8A99AF]"
                            )}
                          >
                            {page}
                          </Button>
                        </React.Fragment>
                      );
                    }
                    return (
                      <Button
                        key={page}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={cn(
                          "min-w-[36px] border-[#2E3A4D] hover:bg-[#2E3A4D] rounded-lg",
                          currentPage === page ? "bg-[#1C2434] text-white" : "text-[#8A99AF]"
                        )}
                      >
                        {page}
                      </Button>
                    );
                  })}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="border-[#2E3A4D] text-[#8A99AF] hover:bg-[#2E3A4D] disabled:opacity-50 rounded-lg"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
} 