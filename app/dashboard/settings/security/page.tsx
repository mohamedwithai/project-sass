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
import { getBankCashCategories, setBankCashCategories, getAccountCategories, setAccountCategories, getLedgerCategories, setLedgerCategories, getAccountTypes, setAccountTypes, getEventsList, setEventsList, getDonarTypes, setDonarTypes, getSourceTypes, setSourceTypes, getDependentSourceTypes, setDependentSourceTypes, getDependentAccountCategories, setDependentAccountCategories } from "@/lib/constants";

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

  // State for Dependent Source Types
  const [selectedBankCashCategoryForSource, setSelectedBankCashCategoryForSource] = useState("");
  const [newDependentSourceType, setNewDependentSourceType] = useState("");
  const [dependentSourceMapping, setDependentSourceMapping] = useState<Record<string, string[]>>({});

  // State for Dependent Account Categories
  const [selectedLedgerCategoryForAccount, setSelectedLedgerCategoryForAccount] = useState("");
  const [newDependentAccountCategory, setNewDependentAccountCategory] = useState("");
  const [dependentAccountMapping, setDependentAccountMapping] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setCurrentBankCashCategories(getBankCashCategories());
    setCurrentAccountCategories(getAccountCategories());
    setCurrentLedgerCategories(getLedgerCategories());
    setCurrentAccountTypes(getAccountTypes());
    setCurrentEventsList(getEventsList());
    setCurrentDonarTypes(getDonarTypes());
    setCurrentSourceTypes(getSourceTypes());
    setDependentSourceMapping(getDependentSourceTypes());
    setDependentAccountMapping(getDependentAccountCategories());
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
    // Also remove from dependentSourceMapping if the category is deleted
    setDependentSourceMapping((prev) => {
      const newMapping = { ...prev };
      delete newMapping[categoryToRemove];
      return newMapping;
    });
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
    // Also remove from dependentAccountMapping if the category is deleted (it's now a parent)
    setDependentAccountMapping((prev) => {
      const newMapping = { ...prev };
      delete newMapping[categoryToRemove];
      return newMapping;
    });
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

  // Handlers for Dependent Source Types
  const handleAddDependentSourceType = () => {
    if (selectedBankCashCategoryForSource && newDependentSourceType) {
      setDependentSourceMapping((prev) => {
        const updatedSources = prev[selectedBankCashCategoryForSource]
          ? [...prev[selectedBankCashCategoryForSource], newDependentSourceType]
          : [newDependentSourceType];
        return {
          ...prev,
          [selectedBankCashCategoryForSource]: updatedSources.filter((item, index, self) => self.indexOf(item) === index), // Ensure unique
        };
      });
      setNewDependentSourceType("");
    }
  };

  const handleRemoveDependentSourceType = (sourceToRemove: string) => {
    if (selectedBankCashCategoryForSource) {
      setDependentSourceMapping((prev) => ({
        ...prev,
        [selectedBankCashCategoryForSource]: prev[selectedBankCashCategoryForSource].filter(
          (source) => source !== sourceToRemove
        ),
      }));
    }
  };

  // Handlers for Dependent Account Categories
  const handleAddDependentAccountCategory = () => {
    if (selectedLedgerCategoryForAccount && newDependentAccountCategory) {
      setDependentAccountMapping((prev) => {
        const updatedAccounts = prev[selectedLedgerCategoryForAccount]
          ? [...prev[selectedLedgerCategoryForAccount], newDependentAccountCategory]
          : [newDependentAccountCategory];
        return {
          ...prev,
          [selectedLedgerCategoryForAccount]: updatedAccounts.filter((item, index, self) => self.indexOf(item) === index), // Ensure unique
        };
      });
      setNewDependentAccountCategory("");
    }
  };

  const handleRemoveDependentAccountCategory = (accountToRemove: string) => {
    if (selectedLedgerCategoryForAccount) {
      setDependentAccountMapping((prev) => ({
        ...prev,
        [selectedLedgerCategoryForAccount]: prev[selectedLedgerCategoryForAccount].filter(
          (account) => account !== accountToRemove
        ),
      }));
    }
  };

  const handleSaveChanges = () => {
    setBankCashCategories(currentBankCashCategories);
    setAccountCategories(currentAccountCategories);
    setLedgerCategories(currentLedgerCategories);
    setAccountTypes(currentAccountTypes);
    setEventsList(currentEventsList);
    setDonarTypes(currentDonarTypes);
    setSourceTypes(currentSourceTypes);
    setDependentSourceTypes(dependentSourceMapping);
    setDependentAccountCategories(dependentAccountMapping);
    alert("Settings saved successfully!");
  };

  return (
    <div className="w-full min-h-screen bg-[var(--page-bg)] py-8 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full bg-[var(--content-bg)] p-6 md:p-8 rounded-lg shadow-lg border border-[var(--border-soft)]">
        <h1 className="text-2xl font-semibold text-[var(--text-normal)] mb-6">Security Settings</h1>

        <div className="space-y-8">
          {/* Bank/Cash Categories */}
          <section>
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-4">Bank/Cash Categories</h2>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {currentBankCashCategories.map((category) => (
                <span key={category} className="flex items-center bg-[var(--accent-subtle)] text-[var(--accent-text)] px-3 py-1 rounded-full text-sm">
                  {category}
                  <button
                    onClick={() => handleRemoveBankCashCategory(category)}
                    className="ml-2 text-[var(--accent-text)] hover:text-[var(--text-danger)]"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="New Bank/Cash Category"
                value={newBankCashCategory}
                onChange={(e) => setNewBankCashCategory(e.target.value)}
                className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
              />
              <Button onClick={handleAddBankCashCategory} className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]">Add</Button>
            </div>
          </section>

          {/* Account Categories */}
          <section>
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-4">Account Categories</h2>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {currentAccountCategories.map((category) => (
                <span key={category} className="flex items-center bg-[var(--accent-subtle)] text-[var(--accent-text)] px-3 py-1 rounded-full text-sm">
                  {category}
                  <button
                    onClick={() => handleRemoveAccountCategory(category)}
                    className="ml-2 text-[var(--accent-text)] hover:text-[var(--text-danger)]"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="New Account Category"
                value={newAccountCategory}
                onChange={(e) => setNewAccountCategory(e.target.value)}
                className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
              />
              <Button onClick={handleAddAccountCategory} className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]">Add</Button>
            </div>
          </section>

          {/* Ledger Categories */}
          <section>
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-4">Ledger Categories</h2>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {currentLedgerCategories.map((category) => (
                <span key={category} className="flex items-center bg-[var(--accent-subtle)] text-[var(--accent-text)] px-3 py-1 rounded-full text-sm">
                  {category}
                  <button
                    onClick={() => handleRemoveLedgerCategory(category)}
                    className="ml-2 text-[var(--accent-text)] hover:text-[var(--text-danger)]"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="New Ledger Category"
                value={newLedgerCategory}
                onChange={(e) => setNewLedgerCategory(e.target.value)}
                className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
              />
              <Button onClick={handleAddLedgerCategory} className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]">Add</Button>
            </div>
          </section>

          {/* Account Types */}
          <section>
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-4">Account Types</h2>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {currentAccountTypes.map((type) => (
                <span key={type} className="flex items-center bg-[var(--accent-subtle)] text-[var(--accent-text)] px-3 py-1 rounded-full text-sm">
                  {type}
                  <button
                    onClick={() => handleRemoveAccountType(type)}
                    className="ml-2 text-[var(--accent-text)] hover:text-[var(--text-danger)]"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="New Account Type"
                value={newAccountType}
                onChange={(e) => setNewAccountType(e.target.value)}
                className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
              />
              <Button onClick={handleAddAccountType} className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]">Add</Button>
            </div>
          </section>

          {/* Events List */}
          <section>
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-4">Events List</h2>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {currentEventsList.map((item) => (
                <span key={item} className="flex items-center bg-[var(--accent-subtle)] text-[var(--accent-text)] px-3 py-1 rounded-full text-sm">
                  {item}
                  <button
                    onClick={() => handleRemoveEventsListItem(item)}
                    className="ml-2 text-[var(--accent-text)] hover:text-[var(--text-danger)]"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="New Event Item"
                value={newEventsListItem}
                onChange={(e) => setNewEventsListItem(e.target.value)}
                className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
              />
              <Button onClick={handleAddEventsListItem} className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]">Add</Button>
            </div>
          </section>

          {/* Donar Types */}
          <section>
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-4">Donar Types</h2>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {currentDonarTypes.map((type) => (
                <span key={type} className="flex items-center bg-[var(--accent-subtle)] text-[var(--accent-text)] px-3 py-1 rounded-full text-sm">
                  {type}
                  <button
                    onClick={() => handleRemoveDonarType(type)}
                    className="ml-2 text-[var(--accent-text)] hover:text-[var(--text-danger)]"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="New Donar Type"
                value={newDonarType}
                onChange={(e) => setNewDonarType(e.target.value)}
                className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
              />
              <Button onClick={handleAddDonarType} className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]">Add</Button>
            </div>
          </section>

          {/* Source Types */}
          <section>
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-4">Source Types</h2>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {currentSourceTypes.map((type) => (
                <span key={type} className="flex items-center bg-[var(--accent-subtle)] text-[var(--accent-text)] px-3 py-1 rounded-full text-sm">
                  {type}
                  <button
                    onClick={() => handleRemoveSourceType(type)}
                    className="ml-2 text-[var(--accent-text)] hover:text-[var(--text-danger)]"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="New Source Type"
                value={newSourceType}
                onChange={(e) => setNewSourceType(e.target.value)}
                className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
              />
              <Button onClick={handleAddSourceType} className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]">Add</Button>
            </div>
          </section>

          {/* Dependent Source Types */}
          <section>
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-4">Dependent Source Types</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="selectBankCashCategoryForSource" className="text-sm font-medium text-[var(--text-muted)]">Select Bank/Cash Category (Parent)</Label>
                <Select
                  value={selectedBankCashCategoryForSource}
                  onValueChange={setSelectedBankCashCategoryForSource}
                >
                  <SelectTrigger className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--input-bg)] border-[var(--border-strong)] text-[var(--text-normal)]">
                    {currentBankCashCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedBankCashCategoryForSource && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-[var(--text-normal)] mb-2">Sources for {selectedBankCashCategoryForSource}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {(dependentSourceMapping[selectedBankCashCategoryForSource] || []).map((source) => (
                      <span key={source} className="flex items-center bg-[var(--accent-subtle)] text-[var(--accent-text)] px-3 py-1 rounded-full text-sm">
                        {source}
                        <button
                          onClick={() => handleRemoveDependentSourceType(source)}
                          className="ml-2 text-[var(--accent-text)] hover:text-[var(--text-danger)]"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="New Dependent Source Type"
                      value={newDependentSourceType}
                      onChange={(e) => setNewDependentSourceType(e.target.value)}
                      className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                    />
                    <Button onClick={handleAddDependentSourceType} className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]">Add</Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Dependent Account Categories (was Dependent Ledger Categories) */}
          <section>
            <h2 className="text-xl font-medium text-[var(--text-normal)] mb-4">Dependent Account Categories</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="selectLedgerCategoryForAccount" className="text-sm font-medium text-[var(--text-muted)]">Select Ledger Category (Parent)</Label>
                <Select
                  value={selectedLedgerCategoryForAccount}
                  onValueChange={setSelectedLedgerCategoryForAccount}
                >
                  <SelectTrigger className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--input-bg)] border-[var(--border-strong)] text-[var(--text-normal)]">
                    {currentLedgerCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedLedgerCategoryForAccount && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-[var(--text-normal)] mb-2">Account Categories for {selectedLedgerCategoryForAccount}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {(dependentAccountMapping[selectedLedgerCategoryForAccount] || []).map((account) => (
                      <span key={account} className="flex items-center bg-[var(--accent-subtle)] text-[var(--accent-text)] px-3 py-1 rounded-full text-sm">
                        {account}
                        <button
                          onClick={() => handleRemoveDependentAccountCategory(account)}
                          className="ml-2 text-[var(--accent-text)] hover:text-[var(--text-danger)]"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="New Dependent Account Category"
                      value={newDependentAccountCategory}
                      onChange={(e) => setNewDependentAccountCategory(e.target.value)}
                      className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--input-bg)] py-2.5 px-4 text-[var(--text-normal)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
                    />
                    <Button onClick={handleAddDependentAccountCategory} className="rounded-md bg-[var(--accent-primary)] py-2 px-4 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]">Add</Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSaveChanges}
              className="rounded-md bg-[var(--accent-primary)] py-2 px-5 font-medium text-[var(--accent-text-on-primary)] hover:bg-[var(--accent-primary-hover)]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 