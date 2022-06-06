import React, { createContext, useContext, useState, useEffect } from "react";

// name of the state
const crypto = createContext();

const Context = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  //   currency is dependency here

  return (
    <crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </crypto.Provider>
  );
};

export default Context;

export const CryptoState = () => {
  return useContext(crypto);
};
