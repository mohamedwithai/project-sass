export const getBankCashCategories = (): string[] => {
  if (typeof window !== 'undefined') {
    const storedCategories = localStorage.getItem('bankCashCategories');
    return storedCategories ? JSON.parse(storedCategories) : ["Bank", "Cash", "Petty Cash"];
  }
  return ["Bank", "Cash", "Petty Cash"];
};

export const setBankCashCategories = (categories: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('bankCashCategories', JSON.stringify(categories));
  }
};

export const getAccountCategories = (): string[] => {
  if (typeof window !== 'undefined') {
    const storedCategories = localStorage.getItem('accountCategories');
    return storedCategories ? JSON.parse(storedCategories) : ["General Donation", "Special Donation", "Interest Capitalized From Bank", "Bank Charges"];
  }
  return ["General Donation", "Special Donation", "Interest Capitalized From Bank", "Bank Charges"];
};

export const setAccountCategories = (categories: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accountCategories', JSON.stringify(categories));
  }
};

export const getLedgerCategories = (): string[] => {
  if (typeof window !== 'undefined') {
    const storedCategories = localStorage.getItem('ledgerCategories');
    return storedCategories ? JSON.parse(storedCategories) : ["Direct Incomes", "Indirect Incomes"];
  }
  return ["Direct Incomes", "Indirect Incomes"];
};

export const setLedgerCategories = (categories: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ledgerCategories', JSON.stringify(categories));
  }
};

export const getAccountTypes = (): string[] => {
  if (typeof window !== 'undefined') {
    const storedCategories = localStorage.getItem('accountTypes');
    return storedCategories ? JSON.parse(storedCategories) : ["Type1", "Type2"];
  }
  return ["Type1", "Type2"];
};

export const setAccountTypes = (categories: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accountTypes', JSON.stringify(categories));
  }
};

export const getEventsList = (): string[] => {
  if (typeof window !== 'undefined') {
    const storedCategories = localStorage.getItem('eventsList');
    return storedCategories ? JSON.parse(storedCategories) : ["Event1", "Event2"];
  }
  return ["Event1", "Event2"];
};

export const setEventsList = (categories: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('eventsList', JSON.stringify(categories));
  }
};

export const getDonarTypes = (): string[] => {
  if (typeof window !== 'undefined') {
    const storedCategories = localStorage.getItem('donarTypes');
    return storedCategories ? JSON.parse(storedCategories) : ["Donor1", "Donor2"];
  }
  return ["Donor1", "Donor2"];
};

export const setDonarTypes = (categories: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('donarTypes', JSON.stringify(categories));
  }
};

export const getSourceTypes = (): string[] => {
  if (typeof window !== 'undefined') {
    const storedCategories = localStorage.getItem('sourceTypes');
    return storedCategories ? JSON.parse(storedCategories) : ["Source1", "Source2"];
  }
  return ["Source1", "Source2"];
};

export const setSourceTypes = (categories: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sourceTypes', JSON.stringify(categories));
  }
};

export const getDependentSourceTypes = (): Record<string, string[]> => {
  if (typeof window !== 'undefined') {
    const storedDependentSources = localStorage.getItem('dependentSourceTypes');
    return storedDependentSources ? JSON.parse(storedDependentSources) : {
      "Bank": ["City Union Bank"],
      "Cash": ["Petty Cash Noor"],
      "Petty Cash": ["Petty Cash Box"],
    };
  }
  return {};
};

export const setDependentSourceTypes = (dependentSources: Record<string, string[]>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dependentSourceTypes', JSON.stringify(dependentSources));
  }
};

export const getDependentAccountCategories = (): Record<string, string[]> => {
  if (typeof window !== 'undefined') {
    const storedDependentAccounts = localStorage.getItem('dependentAccountCategories');
    return storedDependentAccounts ? JSON.parse(storedDependentAccounts) : {
      "Direct Incomes": ["General Donation", "Special Donation"],
      "Indirect Incomes": ["Interest Capitalized From Bank", "Bank Charges"],
    };
  }
  return {};
};

export const setDependentAccountCategories = (dependentAccounts: Record<string, string[]>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dependentAccountCategories', JSON.stringify(dependentAccounts));
  }
}; 