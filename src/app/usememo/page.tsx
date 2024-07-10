"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

interface Props {
  name: string;
  id: string;
}

export default function Teste() {
  const [search, setSearch] = useState();
  const [list, setList] = useState<Props[]>([]);

  const searchEngine = useMemo(() => {
    console.log(search);
  }, [search]);

  return (
    <div>
      <input type="search" onChange={(e: any) => setSearch(e)}>
        Pesquisar
      </input>
      {list.map((list) => (
        <p key={list.id}>{list.name}</p>
      ))}
    </div>
  );
}
