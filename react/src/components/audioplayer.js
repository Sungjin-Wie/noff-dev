import React, { useState, useEffect, useRef } from "react";
import Switch from "@material-ui/core/Switch";
import {
  LinearProgress,
  Box,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 104,
    height: 52,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 2,
    "&$checked": {
      transform: "translateX(52px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "12px solid #fff",
    },
  },
  thumb: {
    width: 48,
    height: 48,
  },
  track: {
    borderRadius: 52 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const useStyles = makeStyles({
  progressBar: {
    width: "60vw",
    margin: "auto",
    height: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  playButton: {
    width: "4rem",
    height: "4rem",
  },
  noff: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "black",
    display: "inline-block",
    marginLeft: 10,
    marginTop: 10,
    ["@media (max-width: 960px)"]: {
      fontSize: "1.3rem",
    },
  },
});

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function LinearProgressWithLabel({ current, value }) {
  const css = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <LinearProgress
        className={css.progressBar}
        variant="determinate"
        value={value}
      />
      {/* <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`00:${
          current < 10 ? "0" : ""
        }${Math.floor(current)}`}</Typography>
      </Box> */}
    </Box>
  );
}

const Player = ({ before, after }) => {
  const css = useStyles();
  const [noff, toggleNoff] = useState(false);
  const [playing, toggle] = useState(false);
  const [current, setCurrent] = useState(0);
  const [musicBefore] = useState(new Audio(before));
  const [musicAfter] = useState(new Audio(after));

  useInterval(() => {
    setCurrent(musicBefore.currentTime);
  }, 100);

  const handleChange = (e) => {
    toggleNoff(e.target.checked);
    musicBefore.volume = e.target.checked ? 0 : 1;
    musicAfter.volume = e.target.checked ? 1 : 0;
  };

  const handleButton = () => {
    if (!playing) {
      musicBefore.play();
      musicBefore.volume = noff ? 0 : 1;
      musicAfter.play();
      musicAfter.volume = noff ? 1 : 0;
    } else {
      musicBefore.pause();
      musicAfter.pause();
    }
    toggle(!playing);
  };
  const normalise = (val) => (val / musicBefore.duration) * 100;
  return (
    <div>
      <LinearProgressWithLabel
        current={musicBefore.currentTime}
        value={normalise(current)}
      />
      <div style={{ clear: "both" }}></div>
      <IconButton color="primary" onClick={handleButton}>
        {playing ? (
          <PauseCircleFilledIcon className={css.playButton} />
        ) : (
          <PlayCircleFilledIcon className={css.playButton} />
        )}
      </IconButton>
      <IOSSwitch checked={noff} onChange={handleChange} name="noffSwitch" />
      <div className={css.noff}>Noff {noff ? "ON" : "OFF"}</div>
    </div>
  );
};

export default Player;
