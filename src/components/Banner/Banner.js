import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    // backgroudImage: "url(./banner.jpg)",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/banner.jpg"})`,
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    height: "40%",
    justifyContent: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Adda
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            The One-Stop-Destination For All Crypto Currency Information!
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
