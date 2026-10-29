"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const POSITION = { lat: -31.41, lng: -64.18 };

export default function MapForm() {
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <div className="map-container">
        <Map
          className="map-canvas"
          defaultCenter={POSITION}
          defaultZoom={9}
          mapId={"d1bba714b78e5d332f7d3dd8"}
          gestureHandling="cooperative"
        >
          <AdvancedMarker position={POSITION} onClick={() => setOpen(true)}>
            <Pin
              background={"#2f902d"}
              borderColor={"#1d5c1c"}
              glyphColor={"#ffffff"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={POSITION} onCloseClick={() => setOpen(false)}>
              <div className="map-info">
                <p className="map-info-text">¡Acá me podés encontrar!</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}