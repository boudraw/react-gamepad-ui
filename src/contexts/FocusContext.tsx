import React, { useContext, useState } from "react";

import { createContext } from "react";

interface IFocus {
  id: string;
  timestamp: number;
}

interface IFocusContextProps {
  focus: IFocus | null;
  setFocus: (id?: string | null) => void;
}

export const FocusContext = createContext<IFocusContextProps>({
  focus: null,
  setFocus: (id) => {},
});

export const useFocus = (): IFocusContextProps => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error("A Focus must be setted");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const FocusProvider: React.FC<IProps> = ({ children }) => {
  const [focus, setInternalFocus] = useState<IFocus | null>(null);

  const setFocus = (id?: string | null) => {
    if (!id) return setInternalFocus(null);
    setInternalFocus({ id, timestamp: Date.now() });
  };

  return (
    <FocusContext.Provider value={{ focus, setFocus }}>
      {children}
    </FocusContext.Provider>
  );
};
