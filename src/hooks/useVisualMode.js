import { useState } from "react";

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = (newM, replace = false) => {
    if(!replace) {
      setMode(newM);
      setHistory(prev => [...prev, newM]);
    } else {
      setMode(newM);
      setHistory(prev => {
        let out = prev;
        out.pop();
        return [...out, newM]
      })
  }
}

  const back = () => {
    if (history.length > 1 && mode !== 'ERROR_DELETE') {
      setMode(history[history.length-2]);
      setHistory(prev => {
        let out = prev.slice(0, -1);
        return [...out];
      })
  } else if (history.length > 1 && mode === 'ERROR_DELETE'){
    setMode(history[history.length-3]);
    setHistory(prev => {
      let out = prev.slice(0, -2);
      return [...out];
      })
  }
  }

  return { mode, transition, back };
}