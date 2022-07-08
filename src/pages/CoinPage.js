import {
  LinearProgress,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import axios from "axios";
// import React from "react";
import { useEffect, useState } from "react";
//
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../Context";
import { numberWithCommas } from "../components/Banner/Carousel";
// import ReactHtmlParser from "react-html-parser";
import parse from "html-react-parser";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  // console.log(coin);

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep a track whether the coin is already favourite
  const alreadyFavorited = watchlist.includes(coin?.id);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      // if screen is less than medium screen
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
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      // keeping it responsive
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  // add a coin to favourite list and update in firestore
  const addToFavorites = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      // update the existing coin list in firestore
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });

      setAlert({
        opened: true,
        message: `${coin?.name} Added to Favorites!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        opened: true,
        message: error.message,
        type: "error",
      });
    }
  };

  // similar to addToFavorites, use complete list, but don't add the coin which we selected
  const removeFromFavorites = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      // update the existing coin list in firestore
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((fav) => fav !== coin?.id),
        },
        { merge: "true" }
      );

      setAlert({
        opened: true,
        message: `${coin?.name} Removed from Favorites!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        opened: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

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
          {parse(coin?.description.en.split(". ")[0])}.
          {/* {ReactHtmlParser(coin?.description.en.split(". ")[0])}. */}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: alreadyFavorited ? "#ff0000" : "#EEBC1D",
              }}
              onClick={alreadyFavorited ? removeFromFavorites : addToFavorites}
            >
              {alreadyFavorited ? "Remove From Favourites" : "Add To Favorites"}
            </Button>
          )}
        </div>
      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
