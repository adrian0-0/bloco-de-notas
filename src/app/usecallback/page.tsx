"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function UseCallback() {
  const [reverse, setReverse] = useState("reversão de case");
  const [inp, setInp] = useState("");
  const reverseString = useCallback(() => {
    if (inp === inp.toLowerCase()) {
      return setReverse(inp.toUpperCase());
    }
    return setReverse(inp.toLowerCase());
  }, [reverse]);

  return (
    <div>
      <input onChange={(e: any) => setInp(e.target.value)} />
      <button onClick={() => setReverse(inp)}>Enviar</button>
      <p>{inp}</p>
    </div>
  );
}
