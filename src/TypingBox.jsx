import { useState, useEffect, useRef } from "react";
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

function TypingBox({ setWordCount, setCharCount, setTimer }) {
  const [text, setText] = useState(null);
  const [input, setInput] = useState("");
  const [curWord, setCurWord] = useState("");
  //   const [wordCount, setWordCount] = useState(0);
  //   const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState([]);
  const [started, setStarted] = useState(false);
  //   const [timer, setTimer] = useState(60);
  const [wordStart, setWordStart] = useState(true);
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
    if (!started) {
      startTimer();
    }
    if (e.target.value.indexOf(" ") >= 0) {
      return;
    }
    let inputText = e.target.value;
    let pendingWord = curWord;
    pendingWord = pendingWord.substring(getCountOfSame(inputText, pendingWord));
    let pendingWords = text;
    pendingWords[0] = pendingWord;
    setText(pendingWords);
    let doneWords = [...done];
    if (wordStart) {
      setWordStart(false);
      doneWords.push({
        word: inputText,
        correct: curWord.startsWith(inputText),
      });
      setDone(doneWords);
    } else {
      doneWords[doneWords.length - 1] = {
        word: inputText,
        correct: curWord.startsWith(inputText),
      };
      setDone(doneWords);
    }
    setInput(e.target.value);
  };

  const handleSpacePress = (e) => {
    if (e.key === " ") {
      if (inputRef.current.value === "") {
        return;
      }
      if (input !== curWord) {
        let doneWords = done;
        let doneLength = doneWords.length;
        doneWords[doneLength - 1] = {
          word: doneWords[doneLength - 1].word,
          correct: false,
        };
        setDone(doneWords);
      } else {
        setWordCount((prev) => prev + 1);
        setCharCount((prev) => prev + done[done.length - 1].word.length);
      }
      const pendingWords = text;
      pendingWords.shift();
      setText(pendingWords);
      setInput("");
      setWordStart(true);
      setCurWord(pendingWords[0]);
      setDone((prev) => [...prev, { word: "", correct: true }]);
    }
  };
  return (
    <div className="typing" onClick={() => inputRef.current.focus()}>
      <div className="done">
        {done &&
          done.map((item, i) => (
            <span
              key={i}
              style={{
                // color: `${item.correct ? "green" : "red"}`,
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
  );
}

export default TypingBox;
