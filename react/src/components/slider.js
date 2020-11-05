import React, { useRef } from "react";
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
    "@media (max-width: 960px)": {
      width: "90vw",
      height: "52.5vw",
    },
  },
  title: {
    fontSize: "2.3rem",
    fontWeight: "bold",
    color: "black",
    display: "inline-block",
    "@media (max-width: 960px)": {
      fontSize: "1.6rem",
    },
  },
  next: {
    zIndex: 10,
    marginLeft: "calc(600px + 25vw)",
    marginTop: "20vw",
    position: "absolute",
    color: "white",
    transform: "scale(2)",
    "@media (max-width: 1280px)": {
      marginLeft: "calc(-100px + 80vw)",
      marginTop: "20vw",
      transform: "scale(2)",
    },
    "@media (max-width: 960px)": {
      marginLeft: "calc(90vw - 50px)",
      marginTop: "30vw",
      transform: "scale(1.5)",
    },
  },
  prev: {
    zIndex: 10,
    marginLeft: "calc(520px - 20vw)",
    marginTop: "20vw",
    position: "absolute",
    color: "white",
    transform: "scale(2)",
    "@media (max-width: 1280px)": {
      marginLeft: "calc(10px + 20vw)",
      marginTop: "20vw",
      transform: "scale(2)",
    },
    "@media (max-width: 960px)": {
      marginLeft: "5vw",
      marginTop: "30vw",
      transform: "scale(1.5)",
    },
  },
  list: {
    zIndex: 10,
    position: "absolute",
    marginLeft: "40vw",
  },
  arrows: {
    zIndex: 10,
    width: "calc(800px+20vw)",
    margin: "auto",
    position: "absolute",
    display: "flex",
  },
});

const NextArrow = ({ className, style, onClick }) => {
  return (
    <IconButton className={className} style={{ ...style }} onClick={onClick}>
      <ArrowForwardIosIcon fontSize="large" />
    </IconButton>
  );
};
const PrevArrow = ({ className, style, onClick }) => {
  return (
    <IconButton className={className} style={{ ...style }} onClick={onClick}>
      <ArrowBackIosIcon fontSize="large" />
    </IconButton>
  );
};

const SoundSlider = () => {
  const slider = useRef();
  const css = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };

  return (
    <>
      <PrevArrow
        className={css.prev}
        onClick={() => slider?.current?.slickPrev()}
      />
      <NextArrow
        className={css.next}
        onClick={() => slider?.current?.slickNext()}
      />
      <Slider ref={slider} {...settings}>
        <div className={css.imageWrapper}>
          <div className={css.title}>지하철</div>
          <img
            className={css.image}
            alt={"img"}
            src={require("./subway.jpeg")}
          />
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
    </>
  );
};

export default SoundSlider;
