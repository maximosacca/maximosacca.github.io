import { useCallback, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import ErrorBoundary from "../Utils/ErrorBoundary";

const POSITION = { lat: -31.41, lng: -64.18 };
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${POSITION.lat},${POSITION.lng}`;

function MapFallback() {
  return (
    <div className="map-container map-fallback" role="status">
      <p>El mapa no está disponible en este momento.</p>
      <a href={MAPS_URL} target="_blank" rel="noreferrer">
        Ver la ubicación en Google Maps
      </a>
    </div>
  );
}

export default function MapForm() {
  const [open, setOpen] = useState(false);
  const [mapError, setMapError] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  const handleMapError = useCallback(() => {
    setMapError(true);
  }, []);

  if (!apiKey || mapError) {
    return <MapFallback />;
  }

  return (
    <ErrorBoundary fallback={<MapFallback />}>
      <APIProvider apiKey={apiKey} onError={handleMapError}>
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
    </ErrorBoundary>
  );
}
