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
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles({
  imageWrapper: {
    marginTop: 40,
    textAlign: "center",
  },
  image: {
    margin: "auto",
    width: "60vw",
    height: "35vw",
    overflow: "hidden",
    // eslint-disable-next-line
    ["@media (max-width: 940px)"]: {
      width: "90vw",
      height: "52.5vw",
    },
  },
  title: {
    fontSize: "2.3rem",
    fontWeight: "bold",
    color: "black",
    display: "inline-block",
    // eslint-disable-next-line
    ["@media (max-width: 960px)"]: {
      fontSize: "1.6rem",
    },
  },
});

const NextArrow = ({ className, style, onClick }) => {
  return (
    <IconButton className={className} style={{ ...style }} onClick={onClick}>
      <ArrowForwardIosIcon />
    </IconButton>
  );
};
const PrevArrow = ({ className, style, onClick }) => {
  return (
    <IconButton className={className} style={{ ...style }} onClick={onClick}>
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const SoundSlider = () => {
  const css = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      <div className={css.imageWrapper}>
        <div className={css.title}>지하철</div>
        <img className={css.image} alt={"img"} src={require("./subway.jpeg")} />
        <Player
          className={css.image}
          before={subwayBefore}
          after={subwayAfter}
        />
      </div>
      <div className={css.imageWrapper}>
        <div className={css.title}>카페</div>
        <img className={css.image} alt={"img"} src={require("./cafe.jpeg")} />
        <Player before={cafeBefore} after={cafeAfter} />
      </div>
      <div className={css.imageWrapper}>
        <div className={css.title}>공원</div>
        <img className={css.image} alt={"img"} src={require("./park.jpg")} />
        <Player before={parkBefore} after={parkAfter} />
      </div>
    </Slider>
  );
};

export default SoundSlider;
