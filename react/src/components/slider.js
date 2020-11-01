import React from "react";
import Slider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import Player from "./audioplayer";
import cafeBefore from "./audio/cafebefore.wav";
import cafeAfter from "./audio/cafeafter.wav";
import parkBefore from "./audio/parkbefore.wav";
import parkAfter from "./audio/parkafter.wav";
import subwayBefore from "./audio/subwaybefore.wav";
import subwayAfter from "./audio/subwayafter.wav";

const useStyles = makeStyles({
  imageWrapper: {
    marginTop: 40,
    textAlign: "center",
  },
  image: {
    margin: "auto",
    width: "60vw",
    ["@media (max-width: 940px)"]: {
      width: "90vw",
    },
  },
  title: {
    fontSize: "2.3rem",
    fontWeight: "bold",
    color: "black",
    display: "inline-block",
    ["@media (max-width: 960px)"]: {
      fontSize: "1.6rem",
    },
  },
});

const SoundSlider = () => {
  const css = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <Slider {...settings}>
      <div className={css.imageWrapper}>
        <div className={css.title}>지하철</div>
        <img className={css.image} src={require("./subway.jpeg")} />
        <Player
          className={css.image}
          before={subwayBefore}
          after={subwayAfter}
        />
      </div>
      <div className={css.imageWrapper}>
        <div className={css.title}>카페</div>
        <img className={css.image} src={require("./cafe.jpg")} />
        <Player before={cafeBefore} after={cafeAfter} />
      </div>
      <div className={css.imageWrapper}>
        <div className={css.title}>공원</div>
        <img className={css.image} src={require("./park.jpg")} />
        <Player before={parkBefore} after={parkAfter} />
      </div>
    </Slider>
  );
};

export default SoundSlider;
