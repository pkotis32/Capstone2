import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface CourtLocation {
  lat: number;
  lng: number;
  name: string;
}

const CourtsMap: React.FC = () => {

  const API_KEY = 'AIzaSyBJH3OKaWYrm3RiNkabZCCfyfM9Z2m0PLk'
  // List of court locations 
  const [courtLocations, setCourtLocations] = useState<CourtLocation[]>([
    
  ]);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 42.0664, // Center of map (example coordinates)
    lng: -87.9373,
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        {/* {courtLocations.map((court, index) => (
          <Marker
            key={index}
            position={{ lat: court.lat, lng: court.lng }}
            title={court.name}
          />
        ))} */}
      </GoogleMap>
    </LoadScript>
  );
};

export default CourtsMap;