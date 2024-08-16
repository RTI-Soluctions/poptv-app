import React, { createContext, useState, ReactNode, useContext } from "react";

interface MyContextType {
  state: string | null;
  updateState: (newState: string) => void;
  isHome: boolean;
  setIsHome: React.Dispatch<React.SetStateAction<boolean>>;
  isAboutUs: boolean;
  setIsAboutUs: React.Dispatch<React.SetStateAction<boolean>>;
  isContact: boolean;
  setIsContact: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  const [isHome, setIsHome] = React.useState(true);
  const [isAboutUs, setIsAboutUs] = React.useState(false);
  const [isContact, setIsContact] = React.useState(false);
  const [state, setState] = useState<string | null>(null);

  const updateState = (newState: string) => {
    setState(newState);
  };

  return (
    <MyContext.Provider
      value={{
        state,
        updateState,
        isHome,
        setIsHome,
        isAboutUs,
        setIsAboutUs,
        isContact,
        setIsContact,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useAppContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
