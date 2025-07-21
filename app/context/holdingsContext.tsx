import React, { createContext, useContext, useState } from 'react';

type Holdings = {
  [symbol: string]: number;
};

type HoldingsContextType = {
  holdings: Holdings;
  updateHolding: (symbol: string, amount: number) => void;
};

const HoldingsContext = createContext<HoldingsContextType>({
  holdings: {},
  updateHolding: () => {},
});

export const HoldingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [holdings, setHoldings] = useState<Holdings>({});

  const updateHolding = (symbol: string, amount: number) => {
    setHoldings((prev) => ({
      ...prev,
      [symbol]: (prev[symbol] || 0) + amount,
    }));
  };

  return (
    <HoldingsContext.Provider value={{ holdings, updateHolding }}>
      {children}
    </HoldingsContext.Provider>
  );
};

export const useHoldings = () => useContext(HoldingsContext);
