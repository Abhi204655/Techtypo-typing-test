import React from "react";

function Stats({ wordCount, charCount, timer }) {
  return (
    <div className="stats">
      <div className="timer">
        <h1>{timer}</h1>
        <p>Seconds</p>
      </div>
      <div className="counts">
        <div className="count">
          <div>
            <h1>{wordCount}</h1>
          </div>
          <p>Words/min</p>
        </div>
        <div className="count">
          <div>
            <h1>{charCount}</h1>
          </div>
          <p>Chars/min</p>
        </div>
        <div className="count">
          <div>
            <h1>{charCount}</h1>
          </div>
          <p>Chars/min</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
