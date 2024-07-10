"use client";
import React, { useRef } from "react";

export default function useref() {
  const divRef = useRef<HTMLInputElement>(null);
  function handleClick() {
    console.log(divRef.current);
  }

  return (
    <div>
      <div ref={divRef}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
        error voluptas itaque sunt nam illum tenetur, fuga voluptatibus expedita
        praesentium nobis minus. Ad beatae dolore possimus, quod necessitatibus
        inventore atque!
      </div>
      <button onClick={handleClick}>Clique aqui</button>
    </div>
  );
}
