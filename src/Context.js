import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

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
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      // check whether database is updated or not
      // update the favourite list
      // unsubscribe after creating one snapshot
      // snapshot enables realtime updation of database
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data());
          setWatchlist(coin.data().coins);
        } else {
          console.log("Nothing in favourite list");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

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
        watchlist,
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
