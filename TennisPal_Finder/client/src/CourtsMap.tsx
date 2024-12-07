import React, { useState, useEffect, useContext, useRef } from "react";
import TennisApi from "../api";
import TokenContext from "./TokenContext";
import UserContext from "./UserContext";

interface CourtLocation {
  court_name: string;
  court_latitude: string;
  court_longitude: string;
  
}

const CourtsMap: React.FC = () => {

  const token = useContext(TokenContext);
  const username = useContext(UserContext);
  const mapRef = useRef<HTMLDivElement | null>(null);
  // List of court locations 
  const [courtLocations, setCourtLocations] = useState<CourtLocation[]>([]);

  let homeLat: string;
  let homeLng: string;
  useEffect(() => {
    const getUserLocation = async () => {
      const user = await TennisApi.getUser(username, token);
      homeLat = user.userInfo.homeLat;
      homeLng = user.userInfo.homeLng;
      console.log(homeLat)
      console.log(homeLng)
    }
    const getLocations = async () => {
      const {locations}: {locations: CourtLocation[]} = await TennisApi.getCourtLocations(token);
      setCourtLocations(locations)
    }
    getUserLocation();
    getLocations();
  }, [])


  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    
    const lat = parseFloat(homeLat);
    const lng = parseFloat(homeLng);
    console.log(lat)
    console.log(lng)
    const center = {lat, lng}; 
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