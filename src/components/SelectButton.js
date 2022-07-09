import { makeStyles } from "@material-ui/styles";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectButton: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      // paddingLeft: 20,
      // paddingRight: 20,
      fontFamily: "Montserrat",
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      width: "22%",
      textAlign: "center",
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectButton}>
      {children}
    </span>
  );
};

export default SelectButton;
