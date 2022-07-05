// rafce - react arrow function export component

import {
  AppBar,
  Container,
  Select,
  Toolbar,
  MenuItem,
  Typography,
  createTheme,
  ThemeProvider,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../Context";
import AuthModal from "./Authentication/AuthModal";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const classes = useStyles();

  const { currency, setCurrency } = CryptoState("INR");

  console.log(currency);

  // to navigate between pages
  const history = useHistory();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push("/")}
              className={classes.title}
              variant="h6"
            >
              Crypto Adda
            </Typography>
            <FormControl>
              <InputLabel id="input_label">Currency</InputLabel>
              <Select
                variant="outlined"
                labelId="input_label"
                style={{
                  width: 120,
                  height: 40,
                  marginRight: 15,
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </FormControl>
            <AuthModal />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
