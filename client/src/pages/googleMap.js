import { useState } from "react";

const GetLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  };

  return (
    <div>
      <button onClick={getUserLocation}>내 위치 가져오기</button>
      {location.lat && location.lng && (
        <p>
          현재 위치: {location.lat}, {location.lng}
        </p>
      )}
    </div>
  );
};

export default GetLocation;
