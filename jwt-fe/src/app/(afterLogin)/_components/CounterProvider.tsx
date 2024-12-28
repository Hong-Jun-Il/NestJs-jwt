"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type CounterActionType = { type: "inc" } | { type: "dec" } | { type: "reset" };

const CounterStateContext = createContext<null | number>(null);
const CounterDispatchContext =
  createContext<null | Dispatch<CounterActionType>>(null);

function counterReducer(state: number, action: CounterActionType): number {
  switch (action.type) {
    case "inc":
      return (state += 1);
    case "dec":
      return (state -= 1);
    case "reset":
      return 0;
    default:
      throw new Error("Unknown Action Type");
  }
}

type Props = {
  children: ReactNode;
  defaultValue: number;
};

export default function CounterProvider({
  children,
  defaultValue,
}: Readonly<Props>) {
  const [state, dispatch] = useReducer(counterReducer, defaultValue);
  return (
    <CounterStateContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterStateContext.Provider>
  );
}

export function useCounterState() {
  const context = useContext(CounterStateContext);
  if (context === null) {
    throw new Error("Can't find Counter State");
  }

  return context;
}

export function useCounterDispatch() {
  const context = useContext(CounterDispatchContext);
  if (context === null) {
    throw new Error("Can't find Counter Dispatch");
  }

  return context;
}
