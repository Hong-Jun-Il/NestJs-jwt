"use client";

import { useCounterDispatch } from "../../_components/CounterProvider";

export default function Action() {
  const dispatch = useCounterDispatch();
  return (
    <ul>
      <li>
        <button onClick={() => dispatch({ type: "inc" })}>증가</button>
        <button onClick={() => dispatch({ type: "dec" })}>감소</button>
        <button onClick={() => dispatch({ type: "reset" })}>리셋</button>
      </li>
    </ul>
  );
}
