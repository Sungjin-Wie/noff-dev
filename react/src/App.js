import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Main } from "./pages";

const useStyles = makeStyles({
  wrapper: {
    width: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
function App() {
  const css = useStyles();
  return (
    <div className={css.wrapper}>
      <Container>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
