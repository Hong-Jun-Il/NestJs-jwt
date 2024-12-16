"use client";

import { GoogleMap, Libraries, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

const libraries = ["places", "marker", "drawing", "geometry"];

const containerStyle = {
  width: "400px",
  height: "400px",
};

type Props = {
  location: {
    lat: number;
    lng: number;
  };
};

export default function Map({ location }: Props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as Libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      const service = new google.maps.places.PlacesService(map);

      const request = {
        location: location,
        radius: 1000,
        type: "restaurant",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPlaces(results);

          results.forEach((place) => {
            if (place.geometry?.location) {
              new google.maps.marker.AdvancedMarkerElement({
                position: place.geometry.location,
                map: map,
                title: place.name,
              });
            }
          });
        }
      });
    }
  }, [map, location]);

  if (loadError) return <p>Encountered error while loading google maps</p>;

  if (!isLoaded) return <div className="h-[400px] w-[400px] bg-gray-300" />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: process.env.NEXT_PUBLIC_MAP_ID }}
    ></GoogleMap>
  );
}
