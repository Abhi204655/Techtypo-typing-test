import { useState, useEffect, useRef } from "react";
import "./App.css";
import { data } from "./data";

const getCountOfSame = (s1, s2) => {
  let n = s1.length;
  let m = s2.length;
  let i = 0;
  let count = 0;
  while (i < n && i < m) {
    if (s1[i] === s2[i]) {
      count++;
    } else {
      break;
    }
    i++;
  }
  return count;
};

const App = () => {
  const [text, setText] = useState(null);
  const [input, setInput] = useState("");
  const [curWord, setCurWord] = useState("");
  const [word, setWord] = useState(0);
  const [char, setChar] = useState(0);
  const [done, setDone] = useState([]);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRef = useRef(null);
  useEffect(() => {
    let dummyText = data.split(" ");
    setText(dummyText);
    setCurWord(dummyText[0]);
    inputRef.current.focus();
  }, []);

  const startTimer = () => {
    setStarted(true);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          alert("finished");
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (e) => {
    if (e.target.value.indexOf(" ") >= 0) {
      // let prevDoneWords = done;
      // prevDoneWords.unshift();
      // setDone(prevDoneWords);
      // setInput("");
      return;
    }
    if (!started) {
      startTimer();
    }
    let d = e.target.value;
    let doneWords = done;
    let doneLength = done.length;

    let pendingWord = curWord;
    pendingWord = pendingWord.substring(getCountOfSame(d, pendingWord));
    console.log(pendingWord);
    let words = text;
    words[0] = pendingWord;
    setText(words);
    if (curWord.startsWith(d)) {
      if (doneLength > 0) {
        doneWords[doneLength - 1] = { word: d, correct: true };
      } else {
        doneWords[0] = { word: d, correct: true };
      }
      setDone(doneWords);
    } else {
      if (doneLength > 0) {
        doneWords[doneLength - 1] = { word: d, correct: false };
      } else {
        doneWords[0] = { word: d, correct: false };
      }
      setDone(doneWords);
    }
    setInput(e.target.value);
  };

  const handleSpacePress = (e) => {
    if (e.key === " ") {
      console.log("space pressed");
      let w = {};

      let doneWords = done;
      doneWords.unshift();
      setDone(done);
      w.word = input.trim();
      if (input.trim() === curWord.trim()) {
        w.correct = true;
        setWord((prev) => prev + 1);
        setChar((prev) => prev + input.trim().length);
      }
      if (!w.correct) {
        w.correct = false;
      }
      // let doneWords = done;
      // doneWords.unshift();
      // doneWords.push(w);
      setDone((prev) => [...prev, w]);
      // setDone(doneWords);
      let data = text;
      data.shift();
      setText(data);
      setInput("");
      setCurWord(text[0]);
    }
  };

  // const handleSpacePress = (e) => {
  //   if (e.key === " ") {
  //     if (input === "" || input === " ") return;
  //     // if (input.trim() === "") {
  //     //   setInput("");
  //     //   return;
  //     // }
  //     let w = {};
  //     w.word = input.trim();
  //     if (input.trim() === curWord.trim()) {
  //       w.correct = true;
  //       setWord((prev) => prev + 1);
  //       setChar((prev) => prev + input.trim().length);
  //     }
  //     if (!w.correct) {
  //       w.correct = false;
  //     }
  //     setDone((prev) => [...prev, w]);
  //     let data = text;
  //     data.shift();
  //     setText(data);
  //     setInput("");
  //     setIndex((prev) => prev + 1);
  //     setCurWord(text[0]);
  //   }
  // };

  return (
    <>
      <div className="App">
        <div className="typing" onClick={() => inputRef.current.focus()}>
          <div className="done">
            {done &&
              done.map((item, i) => (
                <span
                  key={i}
                  style={{
                    color: `${item.correct ? "green" : "red"}`,
                    textDecoration: `${item.correct ? "none" : "line-through"}`,
                  }}
                >
                  {item.word}{" "}
                </span>
              ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            onKeyPress={handleSpacePress}
            ref={inputRef}
          />
          <div className="doing">
            {text && text.map((el, i) => <span key={i}>{el} </span>)}
          </div>
        </div>
      </div>
      <h1>{curWord}</h1>
      <h1>word/min: {word}</h1>
      <h1>char/min: {char}</h1>
      <h1>time: {timer}</h1>
    </>
  );
};

export default App;
