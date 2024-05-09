
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Transaction {
  id: number;
  type: 'add' | 'withdraw';
  amount: number;
  date: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  addFunds: (amount: number) => void;
  withdrawFunds: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within a WalletProvider");
  return context;
}

export const WalletProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addFunds = (amount: number) => {
    setBalance(balance + amount);
    const transaction: Transaction = {
      id: Date.now(),
      type: 'add',
      amount,
      date: new Date().toISOString()
    };
    setTransactions([...transactions, transaction]);
  };

  const withdrawFunds = (amount: number) => {
    if (amount <= balance) {
      setBalance(balance - amount);
      const transaction: Transaction = {
        id: Date.now(),
        type: 'withdraw',
        amount,
        date: new Date().toISOString()
      };
      setTransactions([...transactions, transaction]);
    } else {
      console.error("Not enough balance");
    }
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, addFunds, withdrawFunds }}>
      {children}
    </WalletContext.Provider>
  );
};
