import React from "react";
import Slider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";

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
    <div>
      <Slider {...settings}>
        <div className={css.imageWrapper}>
          <img className={css.image} src={require("./bus.jpg")} />
        </div>
        <div className={css.imageWrapper}>
          <img className={css.image} src={require("./bus.jpg")} />
        </div>
      </Slider>
    </div>
  );
};

export default SoundSlider;
