import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeContextType = {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  backgroundColor: '#1D1A37', // default color
  setBackgroundColor: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundColor, setBackgroundColor] = useState('#1D1A37');

  return (
    <ThemeContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
