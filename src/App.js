import { useState } from "react";
import "./App.css";
import TypingBox from "./TypingBox";
import Stats from "./Stats";
import CssBaseline from "@material-ui/core/CssBaseline";
import Modal from "@material-ui/core/Modal";
import Turtle from "./assets/turtle.svg";
import Trex from "./assets/dino.svg";
import Octopus from "./assets/octopus.svg";
import Charts from "./Charts";

const App = () => {
  const [wordCount, setWordCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [timer, setTimer] = useState(60);
  const [open, setOpen] = useState(false);
  const [restart, setRestart] = useState(false);
  const [accuracy, setAccuracy] = useState(100);

  const getIdentity = () => {
    if (wordCount <= 30) {
      return "Turtle";
    } else if (wordCount > 30 && wordCount <= 46) {
      return "T-rex";
    } else {
      return "Octopus";
    }
  };
  const getImage = () => {
    if (wordCount <= 30) {
      return Turtle;
    } else if (wordCount > 30 && wordCount <= 46) {
      return Trex;
    } else {
      return Octopus;
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <div className="App">
        <div className="navbar">
          <h1>
            TECH<span>TYPO</span>
          </h1>
          <div
            className="timer-bar"
            style={{
              width: `${(timer / 60) * 100}%`,
            }}
          ></div>
        </div>
        <div className="typing-section">
          <div className="splash-left"></div>
          <div className="splash-right"></div>

          <h4 id="small-intro">TYPING SPEED TEST</h4>
          <h1 id="big-intro">Test Your Typing Skills</h1>
          <Stats
            wordCount={wordCount}
            charCount={charCount}
            timer={timer}
            accuracy={accuracy}
          />
          <TypingBox
            wordCount={wordCount}
            setWordCount={setWordCount}
            setCharCount={setCharCount}
            setTimer={setTimer}
            handleOpen={handleOpen}
            restart={restart}
            setRestart={setRestart}
            errorCount={errorCount}
            setErrorCount={setErrorCount}
            setAccuracy={setAccuracy}
          />
          {/* <div className="see-stats">See Stats</div> */}
        </div>
        <div className="user-stats">
          <div className="splash-left"></div>
          <div className="splash-right"></div>
          <Charts />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <div className="modal">
          <div className="left-modal">
            <img src={getImage()} alt="speed" />
          </div>
          <div className="right-modal">
            <h2>You're a {getIdentity()}</h2>
            <p>
              {getIdentity() === "Octopus" ? "Nice.." : "Well.."} You type with
              the speed of <br />
              <span>
                {wordCount} WPM ({charCount} CPM)
              </span>
              . Your accuracy was {accuracy}%.{" "}
              {getIdentity() === "Octopus"
                ? "Keep Practicing."
                : "It could be better!"}
            </p>
            <button
              onClick={() => {
                setCharCount(0);
                setWordCount(0);
                setTimer(60);
                setAccuracy(100);
                setRestart(true);
                handleClose();

                let userStats = localStorage.getItem("userstats");
                if (userStats) {
                  let newUserStats = [
                    ...JSON.parse(userStats),
                    { dateTime: new Date(), wordCount },
                  ];
                  console.log(newUserStats);
                  localStorage.setItem(
                    "userstats",
                    JSON.stringify(newUserStats)
                  );
                } else {
                  userStats = [];
                  userStats.push({ dateTime: new Date(), wordCount });
                  console.log(userStats);
                  localStorage.setItem("userstats", JSON.stringify(userStats));
                }
              }}
            >
              Restart
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default App;
