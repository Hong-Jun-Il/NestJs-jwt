"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setLocation: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
};

async function getGeocode(search: string) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Get Geocode Error!");
  }

  return res.json();
}

export default function GoogleMapSearch({ setLocation }: Props) {
  const [input, setInput] = useState<string>("");

  return (
    <div className="flex">
      <Input value={input} onChange={(e) => setInput(e.target.value)} />
      <Button
        disabled={input === ""}
        onClick={async () => {
          const result = await getGeocode(input);

          if (result.status === "ZERO_RESULTS") {
            alert("검색 결과가 없습니다.");
            return;
          }
          setLocation(result.results[0].geometry.location);
        }}
      >
        검색
      </Button>
    </div>
  );
}
