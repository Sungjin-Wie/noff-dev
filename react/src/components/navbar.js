import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NoffLogo from "./Noff.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  navbar: {
    background: "white",
    margin: "0 auto",
    maxHeight: 100,
    padding: "0 .8em",
    boxSizing: "unset !important",
  },
  logo: {
    width: "10rem",
    cursor: "pointer",
    // eslint-disable-next-line
    ["@media (max-width: 960px)"]: {
      width: "5rem",
    },
  },
  logoWrapper: {
    margin: 10,
  },
});

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Logo = () => {
  const css = useStyles();
  const history = useHistory();
  const handleLogoClick = () => {
    history.push("/#");
  };
  return (
    <div className={css.logoWrapper}>
      <img
        src={NoffLogo}
        alt="logo"
        className={css.logo}
        onClick={handleLogoClick}
      />
    </div>
  );
};

export default function ElevateAppBar(props) {
  const css = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar className={css.navbar}>
          <Toolbar>
            <Logo />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
