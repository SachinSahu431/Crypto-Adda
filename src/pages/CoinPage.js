import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
// import { useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../Context";
import ReactHtmlParser from "react-html-parser";
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  const useState = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
  }));

  const classes = useState();

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        {/* use react-html-parser to handle html parsing in description text */}
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>{" "}
      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
