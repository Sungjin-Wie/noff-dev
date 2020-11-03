import React from "react";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SoundSlider } from "../components";
import Modal from "../components/modal";
import Footer from "../components/footer";

const useStyles = makeStyles({
  flexbox: {},
  mainContainer: {
    textAlign: "center",
    marginTop: 100,
  },
  topic: {
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#f7bc26",
    display: "inline-block",
    ["@media (max-width: 800px)"]: {
      fontSize: "2.5rem",
    },
  },
  endl: {
    clear: "both",
  },
  paragraph: {
    fontSize: "2rem",
    maxWidth: 460,
    ["@media (max-width: 960px)"]: {
      maxWidth: 360,
      fontSize: "1.5rem",
    },
  },
  paragraphnextline: {
    fontSize: "1rem",
    maxWidth: 460,
    ["@media (max-width: 960px)"]: {
      maxWidth: 360,
      fontSize: "0.75rem",
    },
  },
  first: {
    marginLeft: "3rem",
    justifyContent: "center",
    ["@media (max-width: 960px)"]: {
      marginLeft: "1rem",
    },
  },
  second: {
    marginTop: "200px",
    marginLeft: "30rem",
    justifyContent: "flex-end",
    marginBottom: "10rem",
    ["@media (max-width: 960px)"]: {
      marginLeft: "1rem",
    },
  },
  third: {
    width: "inherit",
    textAlign: "center",
    marginTop: 200,
  },
  changedEnv: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "black",
    display: "inline-block",
    ["@media (max-width: 960px)"]: {
      fontSize: "1.5rem",
    },
  },
  blackTopic: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "black",
    display: "inline-block",
    ["@media (max-width: 960px)"]: {
      fontSize: "2.3rem",
    },
  },
  fourth: {
    marginTop: "10rem",
    marginLeft: "5vw",
    ["@media (max-width: 960px)"]: {
      marginLeft: "0vw",
    },
  },
  margin: {
    margin: "100px 100px 100px 100px",
  },
  fifth: { marginTop: 200, textAlign: "center" },
  fifthTopic: {
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#6a4e02",
    ["@media (max-width: 960px)"]: {
      fontSize: "2.5rem",
    },
  },
  fifthImg: {
    width: "30vw",
    ["@media (max-width: 960px)"]: {
      width: "60vw",
    },
  },
  inquiry: {
    textAlign: "center",
    marginTop: 100,
    marginBottom: 50,
  },
  inquirybutton: {
    fontSize: "2rem",
    ["@media (max-width: 960px)"]: {
      fontSize: "1.5rem",
    },
  },
});

const FirstParagraph = () => {
  const css = useStyles();
  return (
    <div className={css.first}>
      <div className={css.topic}>Noff는 어디서든</div>
      <div className={css.endl}></div>
      <div className={css.topic}>자유롭게 소통하는</div>
      <div className={css.endl}></div>
      <div className={css.topic}>세상을 상상합니다.</div>
      <div className={css.endl}></div>
      <p className={css.paragraph}>
        지하철에서든, 카페에서든 주변 소음 없이 통화하고자 할 때 간단하게
        통화음에 섞인 소음을 제거할 수 있도록 인공지능 기반 소음제거 앱을
        제작하고 있습니다.
      </p>
    </div>
  );
};

const SecondParagraph = () => {
  const css = useStyles();
  return (
    <div className={css.second}>
      <div className={css.topic}>주변이 시끄러워</div>
      <div className={css.endl}></div>
      <div className={css.topic}>원활한 전화통화가</div>
      <div className={css.endl}></div>
      <div className={css.topic}>힘들 때.</div>
      <div className={css.endl}></div>
      <p className={css.paragraph}>대중교통이나, 카페에서 전화할 때 등등...</p>
      <div className={css.endl}></div>
    </div>
  );
};

const ThirdParagraph = () => {
  const css = useStyles();
  return (
    <div className={css.third}>
      <div className={css.changedEnv}>변화된 환경을 직접 느껴보세요.</div>
      <div className={css.endl}></div>
    </div>
  );
};

const FourthParagraph = () => {
  const css = useStyles();
  return (
    <div className={css.fourth}>
      <div className={css.blackTopic}>Noff는 통화환경에서만</div>
      <div className={css.endl}></div>
      <div className={css.blackTopic}>활용이 가능할까요?</div>
      <div className={css.endl}></div>
      <div className={css.margin}></div>
      <p className={css.paragraph}>• 회의 때도 조용하게</p>
      <p className={css.paragraph}>• 잡음 방해 없는 강의</p>
      <p className={css.paragraph}>• 선명한 채팅을 통한 즐거운 게이밍</p>
      <p className={css.paragraph}>• 녹음 파일 잡음 제거</p>
      <p className={css.paragraphnextline}></p>
      <p className={css.paragraphnextline}>•</p>
      <p className={css.paragraphnextline}>•</p>
      <p className={css.paragraphnextline}>•</p>
      <p className={css.paragraphnextline}></p>
      <p className={css.paragraph}>
        Noff는 모든 잡음으로부터의 자유를 추구합니다.{" "}
      </p>
    </div>
  );
};

const FifthParagraph = () => {
  const css = useStyles();
  return (
    <div className={css.fifth}>
      <div className={css.fifthTopic}>어디서든 내 방처럼,</div>
      <img className={css.fifthImg} src={require("../components/Noff.png")} />
    </div>
  );
};

const Main = () => {
  const css = useStyles();
  return (
    <div className={css.flexbox}>
      <Container className={css.mainContainer}></Container>
      <FirstParagraph />
      <SecondParagraph />
      <ThirdParagraph />
      <SoundSlider />
      <FourthParagraph />
      <FifthParagraph />
      <Modal />
      <Footer />
    </div>
  );
};

export default Main;
