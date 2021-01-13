import { useState } from "react";
import "./App.css";
import TypingBox from "./TypingBox";
import Stats from "./Stats";

const App = () => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [timer, setTimer] = useState(60);

  return (
    <div className="App">
      <div className="navbar">
        <h1>TECHTYPO</h1>
      </div>
      <div className="typing-section">
        <h4 id="small-intro">TYPING SPEED TEST</h4>
        <h1 id="big-intro">Test Your Typing Sklils</h1>
        <Stats wordCount={wordCount} charCount={charCount} timer={timer} />
        <TypingBox
          setWordCount={setWordCount}
          setCharCount={setCharCount}
          setTimer={setTimer}
        />
      </div>
    </div>
  );
};

export default App;
