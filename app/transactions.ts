// lib/transactions.ts

export type Transaction = {
  type: 'buy' | 'send' | 'receive';
  symbol: string;
  amount: string;
  account: string;
  address: string;
  timestamp: number;
};

// Use `let` instead of `const`
export let transactionLogs: Transaction[] = [];

// Clear function
export const clearTransactionLogs = () => {
  transactionLogs.length = 0; // Clears array without reassigning
};
