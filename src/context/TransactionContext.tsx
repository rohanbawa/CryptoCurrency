// TransactionContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Correctly defined here

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prevTransactions => {
      const updatedTransactions = [...prevTransactions, transaction];
      console.log('Adding transaction:', transaction);
      console.log('Updated transactions:', updatedTransactions);
      return updatedTransactions;
    });
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
