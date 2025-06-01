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
    <div className="w-full min-h-screen bg-[var(--page-bg)] py-8 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-[var(--content-bg)] p-6 md:p-8 rounded-lg shadow-lg border border-[var(--border-soft)]">
        <h1 className="text-2xl font-semibold text-[var(--text-normal)] mb-6">Receipt Entry</h1>
        
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Section: Receipt Info */}
          <section>
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-5">Receipt Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {/* Date */}
              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-sm font-medium text-[var(--text-muted)]">Date</Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
                </div>
              </div>
              {/* Bank/Cash Category */}
              <div className="space-y-1.5">
                <Label htmlFor="bankCashCategory" className="text-sm font-medium text-[var(--text-muted)]">Bank/Cash Category</Label>
                <Select
                  value={formData.bankCashCategory}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, bankCashCategory: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <SelectValue placeholder="Select category" className="text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)]"/>
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--input-bg)] border-[var(--border-strong)] text-[var(--text-normal)]">
                    {bankCashCategories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-[var(--accent-primary)] focus:bg-[var(--accent-primary)] hover:text-[var(--accent-text-on-primary)] focus:text-[var(--accent-text-on-primary)]">
                        {category}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               {/* Account Category */}
              <div className="space-y-1.5">
                <Label htmlFor="accountCategory" className="text-sm font-medium text-[var(--text-muted)]">Account Category</Label>
                <Select
                  value={formData.accountCategory}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, accountCategory: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <SelectValue placeholder="Select category" className="text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)]" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--input-bg)] border-[var(--border-strong)] text-[var(--text-normal)]">
                    {accountCategories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-[var(--accent-primary)] focus:bg-[var(--accent-primary)] hover:text-[var(--accent-text-on-primary)] focus:text-[var(--accent-text-on-primary)]">
                        {category}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Ledger Category */}
              <div className="space-y-1.5">
                <Label htmlFor="ledgerCategory" className="text-sm font-medium text-[var(--text-muted)]">Ledger Category</Label>
                <Select
                  value={formData.ledgerCategory}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, ledgerCategory: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <SelectValue placeholder="Select category" className="text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)]" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--input-bg)] border-[var(--border-strong)] text-[var(--text-normal)]">
                    {ledgerCategories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-[var(--accent-primary)] focus:bg-[var(--accent-primary)] hover:text-[var(--accent-text-on-primary)] focus:text-[var(--accent-text-on-primary)]">
                        {category}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Account Type */}
              <div className="space-y-1.5">
                <Label htmlFor="Account_Type" className="text-sm font-medium text-[var(--text-muted)]">Account Type</Label>
                <Select
                  value={formData.Account_Type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, Account_Type: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <SelectValue placeholder="Select account type" className="text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)]" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--input-bg)] border-[var(--border-strong)] text-[var(--text-normal)]">
                    {accountTypes.map((type) => (
                    <SelectItem key={type} value={type} className="hover:bg-[var(--accent-primary)] focus:bg-[var(--accent-primary)] hover:text-[var(--accent-text-on-primary)] focus:text-[var(--accent-text-on-primary)]">
                        {type}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               {/* Events */}
              <div className="space-y-1.5">
                <Label htmlFor="events" className="text-sm font-medium text-[var(--text-muted)]">Events</Label>
                <Select
                  value={formData.events}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, events: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <SelectValue placeholder="Select event" className="text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)]"/>
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--input-bg)] border-[var(--border-strong)] text-[var(--text-normal)]">
                    {eventsList.map((event) => (
                    <SelectItem key={event} value={event} className="hover:bg-[var(--accent-primary)] focus:bg-[var(--accent-primary)] hover:text-[var(--accent-text-on-primary)] focus:text-[var(--accent-text-on-primary)]">
                        {event}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Donar */}
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="donar" className="text-sm font-medium text-[var(--text-muted)]">Donar</Label>
                <Select
                  value={formData.donar}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, donar: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <SelectValue placeholder="Select donar" className="text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)]" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--input-bg)] border-[var(--border-strong)] text-[var(--text-normal)]">
                    {donarTypes.map((type) => (
                    <SelectItem key={type} value={type} className="hover:bg-[var(--accent-primary)] focus:bg-[var(--accent-primary)] hover:text-[var(--accent-text-on-primary)] focus:text-[var(--accent-text-on-primary)]">
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
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-5">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {/* Description */}
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium text-[var(--text-muted)]">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] min-h-[100px] resize-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  placeholder="Enter description here..."
                  rows={3}
                />
              </div>
              {/* Source */}
              <div className="space-y-1.5">
                <Label htmlFor="source" className="text-sm font-medium text-[var(--text-muted)]">Source</Label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, source: value }))}
                >
                  <SelectTrigger className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <SelectValue placeholder="Select source" className="text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)]"/>
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--input-bg)] border-[var(--border-strong)] text-[var(--text-normal)]">
                    {sourceTypes.map((type) => (
                    <SelectItem key={type} value={type} className="hover:bg-[var(--accent-primary)] focus:bg-[var(--accent-primary)] hover:text-[var(--accent-text-on-primary)] focus:text-[var(--accent-text-on-primary)]">
                        {type}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Amount */}
              <div className="space-y-1.5">
                <Label htmlFor="amount" className="text-sm font-medium text-[var(--text-muted)]">Amount</Label>
                <Input
                  id="amount"
                  type="text"
                  value={formData.amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    setFormData((prev) => ({ ...prev, amount: value }));
                  }}
                  className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  placeholder="Enter amount (e.g., 19000.00)"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-md border-transparent bg-transparent py-2 px-5 font-medium text-[var(--text-muted)] hover:bg-[var(--border-soft)] hover:text-[var(--text-normal)]"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-md bg-[var(--accent-primary)] py-2 px-5 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]"
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