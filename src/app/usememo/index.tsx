"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

export default function Teste() {
  const [count, setCount] = useState(0);

  const handleButton = () => {
    setCount(count + 1);
  };

  const handleImparPar = () => {
    if (count % 2 === 1) {
      return `${count} é impar`;
    }
    if (count % 2 === 0) {
      return `${count} é par`;
    }
  };

  useLayoutEffect(() => {
    handleImparPar();
  }, [count]);

  const Count = () => {
    return (
      <>
        <p>Contador: {count}</p>
      </>
    );
  };

  return (
    <div>
      <button onClick={() => handleButton()}>Incrementar</button>
      <Count />
      <p>{handleImparPar()}</p>
    </div>
  );
}
