import React, { useState } from "react";

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = (newM, replace = false) => {
    if(!replace) {
      setHistory(prev => ([...prev, newM]));
      setMode(newM);
    } else {
      setHistory(prev => {
        prev.pop();
        return [...prev, mode]
      })
      setMode(newM);
  }


  }

  const back = () => {
    if (history.length > 1) {
    setMode(history[history.length-2]);
    setHistory(prev => {
      prev.pop()
      return prev;
    })
  }
  }

  return {mode, transition, back};
}