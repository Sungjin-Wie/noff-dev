import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  name: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    ["@media (max-width: 960px)"]: {
      fontSize: "1rem",
    },
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
        <div className={css.name}>만든 이: 황웅범, 최제락, 장예은, 위승진</div>
      </div>
    </div>
  );
};

export default Footer;
