import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Backdrop, Fade, TextField } from "@material-ui/core";
import StarRatingComponent from "react-star-rating-component";
import Axios from "axios";
let URL = "http://noff.kr/api?";
// let URL = "http://localhost:3000/api?";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
  inquiry: {
    textAlign: "center",
    marginTop: 100,
  },
  inquirybutton: {
    fontSize: "2rem",
    marginBottom: 30,
    "@media (max-width: 960px)": {
      fontSize: "1.5rem",
    },
  },
  star: {
    fontSize: "3.2rem",
    display: "inline-block",
  },
  submitButton: {
    fontSize: "1rem",
    "@media (max-width: 960px)": {
      fontSize: "1rem",
    },
  },
  wrapper: {},
  text: {
    textAlign: "center",
    color: "gray",
    marginBottom: 50,
    "@media (max-width: 960px)": {
      fontSize: "1rem",
      width: "64vw",
      margin: "auto",
      marginBottom: 50,
    },
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [value, setValue] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue);
    console.log(`${name}: ${prevValue} => ${nextValue}`);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log({ rating, value });
    Axios({
      method: "GET",
      url: URL + `rating=${rating}&feedback=${value}`,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setOpen(false);
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.inquiry}>
        <Button
          className={classes.inquirybutton}
          size="large"
          variant="outlined"
          onClick={handleOpen}
        >
          문의하기
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">저희 앱을 평가해주세요!</h2>
            <div id="transition-modal-description">
              <StarRatingComponent
                name="rating"
                starCount={5}
                value={rating}
                onStarClick={onStarClick}
                className={classes.star}
              />
              <div style={{ clear: "both", margin: 10 }}></div>
              <TextField
                id="outlined-multiline-static"
                label="피드백"
                multiline
                rows={4}
                value={value}
                onChange={handleChange}
                variant="outlined"
              />
              <div style={{ clear: "both", margin: 10 }}></div>
              <Button
                className={classes.submitButton}
                variant="outlined"
                onClick={handleSubmit}
              >
                제출하기
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <div className={classes.text}>
        Noff에 대해 궁금한 점과 솔직한 의견이 있으시면 위의 링크를 눌러
        남겨주세요.
      </div>
    </div>
  );
}
