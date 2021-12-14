import React, { useState } from "react";

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = (newM, replace = false) => {
    if(!replace) {
      setMode(newM);
      setHistory(prev => [...prev, newM]);
      console.log(history);
    } else {
      setMode(newM);
      setHistory(prev => {
        let out = prev;
        out.pop();
        console.log('prev mannn', prev);
        return [...out, newM]
      })
  }
  console.log(history);
}

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length-2]);
      setHistory(prev => {
        let out = prev;
        out.pop()
        return [...out];
      })
    // setMode(history[history.length-2])
  }
  }
  
  const doubleBack = () => {
    if (history.length > 2) {
      setMode(history[history.length-3]);
      setHistory(prev => {
        let out = prev;
        out.pop()
        out.pop()
        return [...out];
      })
    }
  }

  return {mode, transition, back, doubleBack};
}