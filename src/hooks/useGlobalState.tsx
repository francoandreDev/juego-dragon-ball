import React, { ReactNode, createContext, useContext, useState } from "react";

interface GlobalStateContextType {
  history: Record<string, number>;
  setHistory: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [history, setHistory] = useState<Record<string, number>>({});

  return (
    <GlobalStateContext.Provider value={{ history, setHistory }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
