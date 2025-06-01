"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

export default function ReceiptEntryPage() {
  const [formData, setFormData] = useState({
    date: "",
    bankCashCategory: "",
    accountCategory: "",
    ledgerCategory: "",
    Account_Type: "",
    events: "",
    donar: "",
    description: "",
    source: "",
    amount: "",
  });
  // Dummy options for select fields (replace with real data or fetch as needed)
  const bankCashCategories = ["Bank", "Cash"];
  const accountCategories = ["General", "Special"];
  const ledgerCategories = ["Ledger1", "Ledger2"];
  const accountTypes = ["Type1", "Type2"];
  const eventsList = ["Event1", "Event2"];
  const donarTypes = ["Donor1", "Donor2"];
  const sourceTypes = ["Source1", "Source2"];

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement actual submit logic
    setTimeout(() => {
      setLoading(false);
      alert("Receipt submitted! (Implement real logic)");
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-[#3C50E0] py-8 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-white mb-6">Receipt Entry</h1>
        
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Section: Receipt Info */}
          <section>
            <h2 className="text-xl font-medium text-white mb-5">Receipt Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-sm font-medium text-gray-300">Date</Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full rounded-md border border-slate-700 bg-slate-800 py-2.5 px-4 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                </div>
              </div>
              {/* Bank/Cash Category */}
              <div className="space-y-1.5">
                <Label htmlFor="bankCashCategory" className="text-sm font-medium text-gray-300">Bank/Cash Category</Label>
                <Select
                  value={formData.bankCashCategory}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, bankCashCategory: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-slate-700 bg-slate-800 py-2.5 px-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select category" className="text-white placeholder:text-slate-400"/>
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {bankCashCategories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-blue-500 focus:bg-blue-500">
                        {category}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               {/* Account Category */}
              <div className="space-y-1.5">
                <Label htmlFor="accountCategory" className="text-sm font-medium text-gray-300">Account Category</Label>
                <Select
                  value={formData.accountCategory}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, accountCategory: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-slate-700 bg-slate-800 py-2.5 px-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select category" className="text-white placeholder:text-slate-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {accountCategories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-blue-500 focus:bg-blue-500">
                        {category}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Ledger Category */}
              <div className="space-y-1.5">
                <Label htmlFor="ledgerCategory" className="text-sm font-medium text-gray-300">Ledger Category</Label>
                <Select
                  value={formData.ledgerCategory}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, ledgerCategory: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-slate-700 bg-slate-800 py-2.5 px-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select category" className="text-white placeholder:text-slate-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {ledgerCategories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-blue-500 focus:bg-blue-500">
                        {category}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Account Type */}
              <div className="space-y-1.5">
                <Label htmlFor="Account_Type" className="text-sm font-medium text-gray-300">Account Type</Label>
                <Select
                  value={formData.Account_Type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, Account_Type: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-slate-700 bg-slate-800 py-2.5 px-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select account type" className="text-white placeholder:text-slate-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {accountTypes.map((type) => (
                    <SelectItem key={type} value={type} className="hover:bg-blue-500 focus:bg-blue-500">
                        {type}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               {/* Events */}
              <div className="space-y-1.5">
                <Label htmlFor="events" className="text-sm font-medium text-gray-300">Events</Label>
                <Select
                  value={formData.events}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, events: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-slate-700 bg-slate-800 py-2.5 px-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select event" className="text-white placeholder:text-slate-400"/>
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {eventsList.map((event) => (
                    <SelectItem key={event} value={event} className="hover:bg-blue-500 focus:bg-blue-500">
                        {event}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Donar */}
              <div className="space-y-1.5">
                <Label htmlFor="donar" className="text-sm font-medium text-gray-300">Donar</Label>
                <Select
                  value={formData.donar}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, donar: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-slate-700 bg-slate-800 py-2.5 px-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select donar" className="text-white placeholder:text-slate-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {donarTypes.map((type) => (
                    <SelectItem key={type} value={type} className="hover:bg-blue-500 focus:bg-blue-500">
                        {type}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
          
          {/* Section: Details */}
          <section>
            <h2 className="text-xl font-medium text-white mb-5">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Description */}
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-md border border-slate-700 bg-slate-800 py-2.5 px-4 text-white placeholder:text-slate-400 min-h-[100px] resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter description here..."
                  rows={3}
                />
              </div>
              {/* Source */}
              <div className="space-y-1.5">
                <Label htmlFor="source" className="text-sm font-medium text-gray-300">Source</Label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, source: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-slate-700 bg-slate-800 py-2.5 px-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select source" className="text-white placeholder:text-slate-400"/>
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {sourceTypes.map((type) => (
                    <SelectItem key={type} value={type} className="hover:bg-blue-500 focus:bg-blue-500">
                        {type}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Amount */}
              <div className="space-y-1.5">
                <Label htmlFor="amount" className="text-sm font-medium text-gray-300">Amount</Label>
                <Input
                  id="amount"
                  type="text"
                  value={formData.amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    setFormData((prev) => ({ ...prev, amount: value }));
                  }}
                  className="w-full rounded-md border border-slate-700 bg-slate-800 py-2.5 px-4 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter amount (e.g., 19000.00)"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-md border-slate-700 bg-slate-800 py-2 px-5 font-medium text-gray-300 hover:bg-slate-700 hover:text-white"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-md bg-blue-600 py-2 px-5 font-medium text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Processing..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 