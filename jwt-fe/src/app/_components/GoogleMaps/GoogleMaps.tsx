"use client";

import { useState } from "react";
import style from "./googleMaps.module.scss";
import GoogleMapSearch from "./GoogleMapSearch";
import Map from "./Map";

export default function GoogleMaps() {
  const [location, setLocation] = useState({
    lat: 37.5503,
    lng: 126.9971,
  });

  return (
    <div className={style.googleMapsWrapper}>
      <GoogleMapSearch setLocation={setLocation} />
      <Map location={location} />
    </div>
  );
}
