"use client";

import { useCounterState } from "../../_components/CounterProvider";

export default function Value() {
  const state = useCounterState();
  return <div>{state}</div>;
}
