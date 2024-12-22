"use client"

import { AppNodeMissingInputsType } from "@/types/workflow-types";
import { createContext, Dispatch, SetStateAction, useState, useContext } from "react";

type FlowValidationContextType = {
  invalidInputs: AppNodeMissingInputsType[];
  setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputsType[]>>;
  clearInputErrors: () => void;
};

export const FlowValidationContext = createContext<FlowValidationContextType | null>(null);

type FlowValidationContextProviderProps = {
  children: React.ReactNode;
};

export function FlowValidationContextProvider({ children }: FlowValidationContextProviderProps) {
  const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputsType[]>([]);

  const clearInputErrors = () => {
    setInvalidInputs([]);
  };

  return (
    <FlowValidationContext.Provider
      value={{
        invalidInputs,
        setInvalidInputs,
        clearInputErrors
      }
      }
    >
      {children}
    </FlowValidationContext.Provider>
  );
}

export const useFlowValidationContext = () => {
  const context = useContext(FlowValidationContext);

  if (!context) {
    throw new Error("useFlowValidationContext must be used within a FlowValidationContextProvider");
  }

  return context;
};
