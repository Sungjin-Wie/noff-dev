import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  name: {
    fontSize: ".8rem",
    color: "rgb(160, 160, 160)",
    margin: "auto",
    marginBottom: 10,
    "@media (max-width: 960px)": {
      fontSize: ".5rem",
    },
  },
  wrapper: {
    borderTop: "1px solid black",
    backgroundColor: "#2a353f",
    textAlign: "center",
  },
  margin: {
    marginTop: 30,
    height: 10,
    "@media (max-width: 960px)": {
      marginTop: 20,
    },
  },
});

const Footer = () => {
  const css = useStyles();
  return (
    <div className={css.wrapper}>
      <div className={css.margin}></div>
      <div className={css.name}>
        노프주식회사 | 경기 수원시 영통구 반달로7번길 40, 490호 | 대표 황웅범
      </div>
      <div className={css.name}>
        사업자등록번호 659-86-01993 | 이메일 sdf4123@naver.com
      </div>
      <div className={css.margin}></div>
    </div>
  );
};

export default Footer;
