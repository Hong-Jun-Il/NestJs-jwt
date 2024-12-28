"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type CurrentSectionType = "main1" | "main2";

type TabContextType = {
  tab: CurrentSectionType;
  setTab: (value: CurrentSectionType) => void;
};

const TabContext = createContext<null | TabContextType>(null);

export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState<CurrentSectionType>("main1");
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  const context = useContext(TabContext);

  if (context === null) {
    throw new Error("Can't find Tab Context");
  }

  return context;
}
