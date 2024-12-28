"use client";

import { useTabContext } from "../_components/TabProvider";
import Main1 from "./_components/main1";
import Main2 from "./_components/main2";

export default function Tab() {
  const { tab, setTab } = useTabContext();
  return (
    <main>
      <nav>
        <div onClick={() => setTab("main1")}>메인1</div>
        <div onClick={() => setTab("main2")}>메인2</div>
      </nav>
      <div>{tab === "main1" ? <Main1 /> : <Main2 />}</div>
    </main>
  );
}
