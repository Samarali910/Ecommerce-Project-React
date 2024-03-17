import { createContext, useContext } from "react";

const Ecommerce_Context = createContext();

export const ContextProvider = Ecommerce_Context.Provider;

export const useEcommerce = () => {
  return useContext(Ecommerce_Context);
};
