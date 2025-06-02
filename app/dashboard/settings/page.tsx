'use client'

import React, { useState, useEffect } from 'react'
import { Plus, X, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type CategoryKey = 'bankCashCategories' | 'accountCategories' | 'ledgerCategories' | 
                  'accountTypes' | 'events' | 'donarTypes' | 'sourceTypes';

const categoryLabels: Record<CategoryKey, string> = {
  bankCashCategories: 'Bank/Cash Categories',
  accountCategories: 'Account Categories',
  ledgerCategories: 'Ledger Categories',
  accountTypes: 'Account Types',
  events: 'Events',
  donarTypes: 'Donor Types',
  sourceTypes: 'Source Types'
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<CategoryKey, string[]>>({
    bankCashCategories: [],
    accountCategories: [],
    ledgerCategories: [],
    accountTypes: [],
    events: [],
    donarTypes: [],
    sourceTypes: []
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOption = (category: CategoryKey) => {
    setSettings(prev => ({
      ...prev,
      [category]: [...prev[category], '']
    }));
  };

  const handleRemoveOption = (category: CategoryKey, index: number) => {
    setSettings(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleOptionChange = (category: CategoryKey, index: number, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: prev[category].map((item, i) => i === index ? value : item)
    }));
  };

  const handleSaveCategory = async (category: CategoryKey) => {
    try {
      setSaving(true);
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          options: settings[category].filter(Boolean) // Remove empty strings
        })
      });

      if (!response.ok) throw new Error('Failed to save settings');
      toast.success(`${categoryLabels[category]} updated successfully`);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(`Failed to save ${categoryLabels[category].toLowerCase()}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.keys(categoryLabels) as CategoryKey[]).map((category) => (
          <div
            key={category}
            className="rounded-lg border border-gray-200 dark:border-[#2E3A4D] bg-white dark:bg-[#0F1824] p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {categoryLabels[category]}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSaveCategory(category)}
                disabled={saving}
                className="bg-[#3C50E0] text-white hover:bg-[#3C50E0]/90"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
            </div>

            <div className="space-y-3">
              {settings[category].map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(category, index, e.target.value)}
                    placeholder={`Enter ${categoryLabels[category].toLowerCase()} option`}
                    className="bg-white dark:bg-[#1C2434] border-gray-200 dark:border-[#2E3A4D] text-gray-900 dark:text-white"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveOption(category, index)}
                    className="h-10 w-10 text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddOption(category)}
                className="w-full mt-2 border-dashed border-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 