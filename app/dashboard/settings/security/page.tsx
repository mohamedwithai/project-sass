"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBankCashCategories, setBankCashCategories, getAccountCategories, setAccountCategories, getLedgerCategories, setLedgerCategories, getAccountTypes, setAccountTypes, getEventsList, setEventsList, getDonarTypes, setDonarTypes, getSourceTypes, setSourceTypes } from "@/lib/constants";

export default function SecuritySettingsPage() {
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [newBankCashCategory, setNewBankCashCategory] = useState("");
  const [currentBankCashCategories, setCurrentBankCashCategories] = useState<string[]>([]);
  const [newAccountCategory, setNewAccountCategory] = useState("");
  const [currentAccountCategories, setCurrentAccountCategories] = useState<string[]>([]);
  const [newLedgerCategory, setNewLedgerCategory] = useState("");
  const [currentLedgerCategories, setCurrentLedgerCategories] = useState<string[]>([]);
  const [newAccountType, setNewAccountType] = useState("");
  const [currentAccountTypes, setCurrentAccountTypes] = useState<string[]>([]);
  const [newEventsListItem, setNewEventsListItem] = useState("");
  const [currentEventsList, setCurrentEventsList] = useState<string[]>([]);
  const [newDonarType, setNewDonarType] = useState("");
  const [currentDonarTypes, setCurrentDonarTypes] = useState<string[]>([]);
  const [newSourceType, setNewSourceType] = useState("");
  const [currentSourceTypes, setCurrentSourceTypes] = useState<string[]>([]);

  useEffect(() => {
    setCurrentBankCashCategories(getBankCashCategories());
    setCurrentAccountCategories(getAccountCategories());
    setCurrentLedgerCategories(getLedgerCategories());
    setCurrentAccountTypes(getAccountTypes());
    setCurrentEventsList(getEventsList());
    setCurrentDonarTypes(getDonarTypes());
    setCurrentSourceTypes(getSourceTypes());
  }, []);

  const handleAddBankCashCategory = () => {
    if (newBankCashCategory && !currentBankCashCategories.includes(newBankCashCategory)) {
      setCurrentBankCashCategories((prev) => [...prev, newBankCashCategory]);
      setNewBankCashCategory("");
    }
  };

  const handleRemoveBankCashCategory = (categoryToRemove: string) => {
    setCurrentBankCashCategories((prev) =>
      prev.filter((category) => category !== categoryToRemove)
    );
  };

  const handleAddAccountCategory = () => {
    if (newAccountCategory && !currentAccountCategories.includes(newAccountCategory)) {
      setCurrentAccountCategories((prev) => [...prev, newAccountCategory]);
      setNewAccountCategory("");
    }
  };

  const handleRemoveAccountCategory = (categoryToRemove: string) => {
    setCurrentAccountCategories((prev) =>
      prev.filter((category) => category !== categoryToRemove)
    );
  };

  const handleAddLedgerCategory = () => {
    if (newLedgerCategory && !currentLedgerCategories.includes(newLedgerCategory)) {
      setCurrentLedgerCategories((prev) => [...prev, newLedgerCategory]);
      setNewLedgerCategory("");
    }
  };

  const handleRemoveLedgerCategory = (categoryToRemove: string) => {
    setCurrentLedgerCategories((prev) =>
      prev.filter((category) => category !== categoryToRemove)
    );
  };

  const handleAddAccountType = () => {
    if (newAccountType && !currentAccountTypes.includes(newAccountType)) {
      setCurrentAccountTypes((prev) => [...prev, newAccountType]);
      setNewAccountType("");
    }
  };

  const handleRemoveAccountType = (typeToRemove: string) => {
    setCurrentAccountTypes((prev) =>
      prev.filter((type) => type !== typeToRemove)
    );
  };

  const handleAddEventsListItem = () => {
    if (newEventsListItem && !currentEventsList.includes(newEventsListItem)) {
      setCurrentEventsList((prev) => [...prev, newEventsListItem]);
      setNewEventsListItem("");
    }
  };

  const handleRemoveEventsListItem = (itemToRemove: string) => {
    setCurrentEventsList((prev) =>
      prev.filter((item) => item !== itemToRemove)
    );
  };

  const handleAddDonarType = () => {
    if (newDonarType && !currentDonarTypes.includes(newDonarType)) {
      setCurrentDonarTypes((prev) => [...prev, newDonarType]);
      setNewDonarType("");
    }
  };

  const handleRemoveDonarType = (typeToRemove: string) => {
    setCurrentDonarTypes((prev) =>
      prev.filter((type) => type !== typeToRemove)
    );
  };

  const handleAddSourceType = () => {
    if (newSourceType && !currentSourceTypes.includes(newSourceType)) {
      setCurrentSourceTypes((prev) => [...prev, newSourceType]);
      setNewSourceType("");
    }
  };

  const handleRemoveSourceType = (typeToRemove: string) => {
    setCurrentSourceTypes((prev) =>
      prev.filter((type) => type !== typeToRemove)
    );
  };

  const handleSaveChanges = () => {
    console.log("Saving security settings:", { selectedAccountType });
    setBankCashCategories(currentBankCashCategories);
    setAccountCategories(currentAccountCategories);
    setLedgerCategories(currentLedgerCategories);
    setAccountTypes(currentAccountTypes);
    setEventsList(currentEventsList);
    setDonarTypes(currentDonarTypes);
    setSourceTypes(currentSourceTypes);
    alert("Security settings saved!");
  };

  return (
    <div className="w-full min-h-screen bg-[var(--page-bg)] py-8 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full bg-[var(--content-bg)] p-6 md:p-8 rounded-lg shadow-lg border border-[var(--border-soft)]">
        <h1 className="text-2xl font-semibold text-[var(--text-normal)] mb-6">Security Settings</h1>
        
        <section className="space-y-6">
          <h2 className="text-xl font-medium text-[var(--text-normal)] mb-4">Configurations</h2>
          
          <div className="space-y-4">
            {/* Example: Account Type Configuration */}
            {/* <div className="space-y-1.5">
              <Label htmlFor="accountType" className="text-sm font-medium text-[var(--text-muted)]">Default Account Type</Label>
              <Select
                value={selectedAccountType}
                onValueChange={setSelectedAccountType}
              >
                <SelectTrigger className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]">
                  <SelectValue placeholder="Select a default account type" className="text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)]" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--input-bg)] border-[var(--border-strong)] text-[var(--text-normal)]">
                  {getAccountTypes().map((type) => (
                    <SelectItem key={type} value={type} className="hover:bg-[var(--accent-primary)] focus:bg-[var(--accent-primary)] hover:text-[var(--accent-text-on-primary)] focus:text-[var(--accent-text-on-primary)]">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            {/* Bank/Cash Categories Configuration */}
            <div className="space-y-1.5">
              <Label htmlFor="bankCashCategories" className="text-sm font-medium text-[var(--text-muted)]">Manage Bank/Cash Categories</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="newBankCashCategory"
                  type="text"
                  value={newBankCashCategory}
                  onChange={(e) => setNewBankCashCategory(e.target.value)}
                  className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  placeholder="Add new category"
                />
                <Button
                  type="button"
                  onClick={handleAddBankCashCategory}
                  className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]"
                >
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentBankCashCategories.map((category) => (
                  <span
                    key={category}
                    className="flex items-center gap-1 rounded-md bg-[var(--border-strong)] px-2 py-1 text-sm text-[var(--text-normal)]"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveBankCashCategory(category)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-normal)]"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Account Categories Configuration */}
            <div className="space-y-1.5">
              <Label htmlFor="accountCategories" className="text-sm font-medium text-[var(--text-muted)]">Manage Account Categories</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="newAccountCategory"
                  type="text"
                  value={newAccountCategory}
                  onChange={(e) => setNewAccountCategory(e.target.value)}
                  className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  placeholder="Add new category"
                />
                <Button
                  type="button"
                  onClick={handleAddAccountCategory}
                  className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]"
                >
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentAccountCategories.map((category) => (
                  <span
                    key={category}
                    className="flex items-center gap-1 rounded-md bg-[var(--border-strong)] px-2 py-1 text-sm text-[var(--text-normal)]"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveAccountCategory(category)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-normal)]"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Ledger Categories Configuration */}
            <div className="space-y-1.5">
              <Label htmlFor="ledgerCategories" className="text-sm font-medium text-[var(--text-muted)]">Manage Ledger Categories</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="newLedgerCategory"
                  type="text"
                  value={newLedgerCategory}
                  onChange={(e) => setNewLedgerCategory(e.target.value)}
                  className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  placeholder="Add new category"
                />
                <Button
                  type="button"
                  onClick={handleAddLedgerCategory}
                  className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]"
                >
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentLedgerCategories.map((category) => (
                  <span
                    key={category}
                    className="flex items-center gap-1 rounded-md bg-[var(--border-strong)] px-2 py-1 text-sm text-[var(--text-normal)]"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveLedgerCategory(category)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-normal)]"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Account Types Configuration */}
            <div className="space-y-1.5">
              <Label htmlFor="accountTypes" className="text-sm font-medium text-[var(--text-muted)]">Manage Account Types</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="newAccountType"
                  type="text"
                  value={newAccountType}
                  onChange={(e) => setNewAccountType(e.target.value)}
                  className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  placeholder="Add new type"
                />
                <Button
                  type="button"
                  onClick={handleAddAccountType}
                  className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]"
                >
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentAccountTypes.map((type) => (
                  <span
                    key={type}
                    className="flex items-center gap-1 rounded-md bg-[var(--border-strong)] px-2 py-1 text-sm text-[var(--text-normal)]"
                  >
                    {type}
                    <button
                      type="button"
                      onClick={() => handleRemoveAccountType(type)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-normal)]"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Events List Configuration */}
            <div className="space-y-1.5">
              <Label htmlFor="eventsList" className="text-sm font-medium text-[var(--text-muted)]">Manage Events List</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="newEventsListItem"
                  type="text"
                  value={newEventsListItem}
                  onChange={(e) => setNewEventsListItem(e.target.value)}
                  className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  placeholder="Add new event"
                />
                <Button
                  type="button"
                  onClick={handleAddEventsListItem}
                  className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]"
                >
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentEventsList.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1 rounded-md bg-[var(--border-strong)] px-2 py-1 text-sm text-[var(--text-normal)]"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveEventsListItem(item)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-normal)]"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Donar Types Configuration */}
            <div className="space-y-1.5">
              <Label htmlFor="donarTypes" className="text-sm font-medium text-[var(--text-muted)]">Manage Donor Types</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="newDonarType"
                  type="text"
                  value={newDonarType}
                  onChange={(e) => setNewDonarType(e.target.value)}
                  className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  placeholder="Add new donor type"
                />
                <Button
                  type="button"
                  onClick={handleAddDonarType}
                  className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]"
                >
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentDonarTypes.map((type) => (
                  <span
                    key={type}
                    className="flex items-center gap-1 rounded-md bg-[var(--border-strong)] px-2 py-1 text-sm text-[var(--text-normal)]"
                  >
                    {type}
                    <button
                      type="button"
                      onClick={() => handleRemoveDonarType(type)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-normal)]"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Source Types Configuration */}
            <div className="space-y-1.5">
              <Label htmlFor="sourceTypes" className="text-sm font-medium text-[var(--text-muted)]">Manage Source Types</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="newSourceType"
                  type="text"
                  value={newSourceType}
                  onChange={(e) => setNewSourceType(e.target.value)}
                  className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                  placeholder="Add new source type"
                />
                <Button
                  type="button"
                  onClick={handleAddSourceType}
                  className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]"
                >
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentSourceTypes.map((type) => (
                  <span
                    key={type}
                    className="flex items-center gap-1 rounded-md bg-[var(--border-strong)] px-2 py-1 text-sm text-[var(--text-normal)]"
                  >
                    {type}
                    <button
                      type="button"
                      onClick={() => handleRemoveSourceType(type)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-normal)]"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        <div className="flex justify-end gap-3 pt-8">
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
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
} 