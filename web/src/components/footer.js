import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  name: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  wrapper: {
    borderTop: "1px solid black",
  },
  margin: {
    marginTop: 30,
    marginLeft: 50,
    marginBottom: 50,
    ["@media (max-width: 960px)"]: {
      marginTop: 20,
      marginLeft: 15,
      marginBottom: 30,
    },
  },
});

const Footer = () => {
  const css = useStyles();
  return (
    <div className={css.wrapper}>
      <div className={css.margin}>
        <div className={css.name}>FROGY</div>
        <div className={css.name}>BEN</div>
        <div className={css.name}>YEJANG</div>
      </div>
    </div>
  );
};

export default Footer;
