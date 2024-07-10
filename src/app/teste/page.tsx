"use client";

import React, { useRef } from "react";

export default function Teste() {
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault(0);
    console.log(emailRef.current?.value);
    console.log(phoneRef.current?.value);
    console.log(ageRef.current?.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef}></input>
        <input type="phone" ref={phoneRef}></input>
        <input type="number" ref={ageRef}></input>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
