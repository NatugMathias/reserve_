import React, { createContext, useState, useContext, ReactNode } from 'react';

type BackgroundColorContextType = {
  bgColor: string;
  setBgColor: (color: string) => void;
};

const BackgroundColorContext = createContext<BackgroundColorContextType | undefined>(undefined);

export const BackgroundColorProvider = ({ children }: { children: ReactNode }) => {
  const [bgColor, setBgColor] = useState<string>('#1d1a37');

  return (
    <BackgroundColorContext.Provider value={{ bgColor, setBgColor }}>
      {children}
    </BackgroundColorContext.Provider>
  );
};

export const useBackgroundColor = () => {
  const context = useContext(BackgroundColorContext);
  if (!context) throw new Error('useBackgroundColor must be used within BackgroundColorProvider');
  return context;
};
