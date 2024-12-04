import React, { useState, useEffect, useContext, useRef } from "react";
import TennisApi from "../api";
import TokenContext from "./TokenContext";

interface CourtLocation {
  court_name: string;
  court_latitude: string;
  court_longitude: string;
  
}

const CourtsMap: React.FC = () => {

  const token = useContext(TokenContext);
  const mapRef = useRef<HTMLDivElement | null>(null);
  // List of court locations 
  const [courtLocations, setCourtLocations] = useState<CourtLocation[]>([
    
  ]);


  useEffect(() => {
    const getLocations = async () => {
      const {locations}: {locations: CourtLocation[]} = await TennisApi.getCourtLocations(token);
      setCourtLocations(locations)
    }
    getLocations();
  }, [])


  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    const center = { lat: 42.0664, lng: -87.9373 }; // Example center
    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 12
    });

    // Create a single InfoWindow instance
    const infoWindow = new google.maps.InfoWindow();

    // Add markers for each court
    courtLocations.forEach((court) => {
      const marker = new google.maps.Marker({
        position: {
          lat: parseFloat(court.court_latitude),
          lng: parseFloat(court.court_longitude),
        },
        map,
        title: court.court_name,
      });

      // Custom HTML for the info window content
      const infoContent = `
      <div class="info-window">
        <h5 class="info-title">${court.court_name}</h2>
        <p class="info-details">${court.court_latitude}, ${court.court_longitude}</p>
      </div>
    `;
      // Add click event to the marker to display the InfoWindow
      marker.addListener("click", () => {
        infoWindow.setContent(infoContent);  // Set content for info window (you can customize it)
        infoWindow.open(map, marker);  // Open the info window on the marker
      });

    });
  }, [courtLocations]); 

  if (courtLocations.length == 0) {
    return <div>No courts near you</div>
  }

  return (
    <div ref={mapRef} style={{ width: "100%", height: "80vh" }} />
  )


};

export default CourtsMap;