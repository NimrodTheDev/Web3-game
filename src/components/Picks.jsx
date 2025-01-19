import React, { useState, useEffect } from "react";
import Result from "./Result";

function Picks({ resultDisplayer, Component, housePick, className, reset }) {
  const [visible, setVisible] = useState(false);
  const [win, setWin] = useState("");
  const [text, setText] = useState("");

  const makeVisible = () => {
    let winner = "";
    let resultText = "";

    setTimeout(() => {
      switch (className) {
        case "rock":
          if (housePick.className === "scissor") {
            resultText = resultDisplayer("true");
            winner = "user";
          } else if (housePick.className === "paper") {
            resultText = resultDisplayer("false");
            winner = "comp";
          } else {
            resultText = resultDisplayer("draw");
          }
          break;
        case "paper":
          if (housePick.className === "rock") {
            resultText = resultDisplayer("true");
            winner = "user";
          } else if (housePick.className === "scissor") {
            resultText = resultDisplayer("false");
            winner = "comp";
          } else {
            resultText = resultDisplayer("draw");
          }
          break;
        case "scissor":
          if (housePick.className === "paper") {
            resultText = resultDisplayer("true");
            winner = "user";
          } else if (housePick.className === "rock") {
            resultText = resultDisplayer("false");
            winner = "comp";
          } else {
            resultText = resultDisplayer("draw");
          }
          break;
        default:
          resultText = resultDisplayer("invalid");
      }

      setText(resultText);
      setWin(winner);
      setVisible(true);
    }, 1500);
  };

  useEffect(() => {
    makeVisible();
  }, []);

  return (
    <div className="pick">
      <div className="yourPick">
        <p>YOU PICKED</p>
        <div
          className={[
            "obj",
            className,
            win === "user" ? "winner" : "",
            "holder",
          ].join(" ")}
        >
          {Component}
        </div>
      </div>
      {visible && <Result result={text} func={reset} />}
      <div className="housePick">
        <p>THE HOUSE PICK</p>
        <div
          className={[
            "obj",
            visible ? housePick.className : "",
            "holder",
            win === "comp" ? "winner" : "",
            visible ? "" : "default",
          ].join(" ")}
        >
          {visible ? housePick.obj : null}
        </div>
      </div>
    </div>
  );
}

export default Picks;
