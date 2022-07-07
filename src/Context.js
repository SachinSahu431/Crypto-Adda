import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// name of the state
const crypto = createContext();

const Context = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  const [alert, setAlert] = useState({
    opened: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) setUser(user);
        else setUser(null);
      },
      []
    );
  }, []);

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  //   currency is dependency here

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    //   console.log(data);
    setCoins(data);
    setLoading(false);
  };
  //   console.log(coins);

  return (
    <crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        alert,
        setAlert,
        user,
        coins,
        loading,
        fetchCoins,
      }}
    >
      {children}
    </crypto.Provider>
  );
};

export default Context;

export const CryptoState = () => {
  return useContext(crypto);
};
