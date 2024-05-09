import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Transaction {
  id: number;
  type: 'add' | 'withdraw' | 'buy' | 'sell';
  amount: number; // For 'buy' and 'sell', this is the amount of crypto
  price?: number; // For 'buy' and 'sell', this is the price per unit of crypto
  date: string;
  symbol?: string; // For crypto transactions
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  portfolio: { [key: string]: number }; // Portfolio to store crypto quantities
  addFunds: (amount: number) => void;
  withdrawFunds: (amount: number) => void;
  buyCrypto: (symbol: string, quantity: number, pricePerUnit: number) => void;
  sellCrypto: (symbol: string, quantity: number, pricePerUnit: number) => void;
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
  const [portfolio, setPortfolio] = useState<{ [key: string]: number }>({});

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

  const buyCrypto = (symbol: string, quantity: number, pricePerUnit: number) => {
    const cost = pricePerUnit * quantity;
    if (cost <= balance) {
      setBalance(balance - cost);
      setPortfolio(prev => ({ ...prev, [symbol]: (prev[symbol] || 0) + quantity }));
      const transaction: Transaction = {
        id: Date.now(),
        type: 'buy',
        symbol,
        amount: quantity,
        price: pricePerUnit,
        date: new Date().toISOString()
      };
      setTransactions([...transactions, transaction]);
    } else {
        console.error("Not enough balance to buy");
    }
  };

  const sellCrypto = (symbol: string, quantity: number, pricePerUnit: number) => {
    if (portfolio[symbol] && quantity <= portfolio[symbol]) {
      setBalance(balance + pricePerUnit * quantity);
      setPortfolio(prev => ({ ...prev, [symbol]: prev[symbol] - quantity }));
      const transaction: Transaction = {
        id: Date.now(),
        type: 'sell',
        symbol,
        amount: quantity,
        price: pricePerUnit,
        date: new Date().toISOString()
      };
      setTransactions([...transactions, transaction]);
    } else {
      console.error("Not enough crypto to sell");
    }
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, portfolio, addFunds, withdrawFunds, buyCrypto, sellCrypto }}>
      {children}
    </WalletContext.Provider>
  );
};
