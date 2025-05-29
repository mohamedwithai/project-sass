'use client'

import { useState } from 'react'
import { Search, Download, Trash2, PenLine, Calendar } from 'lucide-react'
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
  events: string
  donar: string
  description: string
  source: string
  amount: string
}

const users: User[] = [
  {
    id: 1,
    name: 'Lindsey Curtis',
    email: 'demoemail@gmail.com',
    position: 'Sales Assistant',
    salary: 89500,
    office: 'Edinburgh',
    status: 'Hired'
  },
  {
    id: 2,
    name: 'Kaiya George',
    email: 'demoemail@gmail.com',
    position: 'Chief Executive Officer',
    salary: 105000,
    office: 'London',
    status: 'In Progress'
  },
  {
    id: 3,
    name: 'Zain Geidt',
    email: 'demoemail@gmail.com',
    position: 'Junior Technical Author',
    salary: 120000,
    office: 'San Francisco',
    status: 'In Progress'
  },
  {
    id: 4,
    name: 'Abram Schleifer',
    email: 'demoemail@gmail.com',
    position: 'Software Engineer',
    salary: 95000,
    office: 'New York',
    status: 'Hired'
  },
  {
    id: 5,
    name: 'Carla George',
    email: 'demoemail@gmail.com',
    position: 'Integration Specialist',
    salary: 80000,
    office: 'Chicago',
    status: 'Pending'
  }
]

export default function ReceiptsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [entriesPerPage, setEntriesPerPage] = useState('5')
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [formData, setFormData] = useState({
    date: '',
    bankCashCategory: '',
    accountCategory: '',
    ledgerCategory: '',
    events: '',
    donar: '',
    description: '',
    source: '',
    amount: ''
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create new receipt with auto-generated SlNo
    const newReceipt = {
      ...formData,
      slNo: receipts.length + 1
    }
    setReceipts([...receipts, newReceipt])
    
    // Reset form
    setFormData({
      date: '',
      bankCashCategory: '',
      accountCategory: '',
      ledgerCategory: '',
      events: '',
      donar: '',
      description: '',
      source: '',
      amount: ''
    })
  }

  return (
    <div className="space-y-6">
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
                    <SelectItem value="bank">Bank</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
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
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
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
                    <SelectItem value="ledger1">Ledger 1</SelectItem>
                    <SelectItem value="ledger2">Ledger 2</SelectItem>
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
                    <SelectItem value="event1">Event 1</SelectItem>
                    <SelectItem value="event2">Event 2</SelectItem>
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
                    <SelectItem value="donar1">Donar 1</SelectItem>
                    <SelectItem value="donar2">Donar 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-gray-900 dark:text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white min-h-[100px]"
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
                    <SelectItem value="source1">Source 1</SelectItem>
                    <SelectItem value="source2">Source 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-900 dark:text-white">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#3C50E0] text-white hover:bg-[#3C50E0]/90"
              >
                Receipt Entry
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Existing table component */}
      <div className="rounded-lg border border-gray-200 dark:border-[#2E3A4D] bg-white dark:bg-[#0F1824]">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Receipts</h3>
          <p className="text-sm font-light text-gray-500 dark:text-[#8A99AF] mb-6">All Entries are shows here...</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-[#8A99AF]">Show</span>
              <Select
                value={entriesPerPage}
                onValueChange={setEntriesPerPage}
              >
                <SelectTrigger className="w-[70px] bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white rounded-lg">
                  <SelectValue placeholder="5" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] rounded-lg">
                  <SelectItem value="5" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D]">5</SelectItem>
                  <SelectItem value="10" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D]">10</SelectItem>
                  <SelectItem value="20" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D]">20</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500 dark:text-[#8A99AF]">entries</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-[240px] pl-9 bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-[#8A99AF] rounded-lg"
                />
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-[#8A99AF]" />
              </div>

              <Button variant="outline" size="sm" className="border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D] rounded-lg">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-[#2E3A4D]">
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#1C2434]">
                    <th className="w-[30px] px-4 py-4 border-r border-gray-200 dark:border-[#2E3A4D] first:rounded-tl-lg">
                      <input type="checkbox" className="rounded border-gray-200 dark:border-[#2E3A4D]" />
                    </th>
                    <th className="px-4 py-4 text-left border-r border-gray-200 dark:border-[#2E3A4D]">
                      <button className="flex items-center gap-1 text-[12px] leading-[18px] font-medium text-gray-500 dark:text-[#8A99AF]">
                        Sl No
                      </button>
                    </th>
                    <th className="px-4 py-4 text-left border-r border-gray-200 dark:border-[#2E3A4D]">
                      <button className="flex items-center gap-1 text-[12px] leading-[18px] font-medium text-gray-500 dark:text-[#8A99AF]">
                        Date
                      </button>
                    </th>
                    <th className="px-4 py-4 text-left border-r border-gray-200 dark:border-[#2E3A4D]">
                      <button className="flex items-center gap-1 text-[12px] leading-[18px] font-medium text-gray-500 dark:text-[#8A99AF]">
                        Category
                      </button>
                    </th>
                    <th className="px-4 py-4 text-left border-r border-gray-200 dark:border-[#2E3A4D]">
                      <button className="flex items-center gap-1 text-[12px] leading-[18px] font-medium text-gray-500 dark:text-[#8A99AF]">
                        Description
                      </button>
                    </th>
                    <th className="px-4 py-4 text-left border-r border-gray-200 dark:border-[#2E3A4D]">
                      <button className="flex items-center gap-1 text-[12px] leading-[18px] font-medium text-gray-500 dark:text-[#8A99AF]">
                        Amount
                      </button>
                    </th>
                    <th className="px-4 py-4 text-left last:rounded-tr-lg">
                      <button className="flex items-center gap-1 text-[12px] leading-[18px] font-medium text-gray-500 dark:text-[#8A99AF]">
                        Action
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.map((receipt) => (
                    <tr key={receipt.slNo} className="border-b border-gray-200 dark:border-[#2E3A4D] last:border-b-0">
                      <td className="px-4 py-5 border-r border-gray-200 dark:border-[#2E3A4D]">
                        <input type="checkbox" className="rounded border-gray-200 dark:border-[#2E3A4D]" />
                      </td>
                      <td className="px-4 py-5 border-r border-gray-200 dark:border-[#2E3A4D]">
                        <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.slNo}</p>
                      </td>
                      <td className="px-4 py-5 border-r border-gray-200 dark:border-[#2E3A4D]">
                        <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.date}</p>
                      </td>
                      <td className="px-4 py-5 border-r border-gray-200 dark:border-[#2E3A4D]">
                        <div>
                          <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.bankCashCategory}</p>
                          <p className="text-[14px] leading-[20px] font-normal text-gray-500 dark:text-[#8A99AF]">{receipt.accountCategory}</p>
                        </div>
                      </td>
                      <td className="px-4 py-5 border-r border-gray-200 dark:border-[#2E3A4D]">
                        <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">{receipt.description}</p>
                      </td>
                      <td className="px-4 py-5 border-r border-gray-200 dark:border-[#2E3A4D]">
                        <p className="text-[14px] leading-[20px] font-normal text-gray-900 dark:text-white">₹{Number(receipt.amount).toLocaleString()}</p>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 dark:text-[#8A99AF] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D] rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 dark:text-[#8A99AF] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D] rounded-lg"
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
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-6">
            <p className="text-sm text-gray-500 dark:text-[#8A99AF]">
              Showing {receipts.length > 0 ? 1 : 0} to {receipts.length} of {receipts.length} entries
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-gray-200 dark:border-[#2E3A4D] text-gray-500 dark:text-[#8A99AF] hover:bg-gray-100 dark:hover:bg-[#2E3A4D] disabled:opacity-50 rounded-lg"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="min-w-[36px] border-gray-200 dark:border-[#2E3A4D] bg-white dark:bg-[#1C2434] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D] rounded-lg"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="min-w-[36px] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D] rounded-lg"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2E3A4D] rounded-lg"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 