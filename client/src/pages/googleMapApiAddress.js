import React, { useState, useEffect } from "react";

const LocationFetcher = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          getAddress(latitude, longitude); // 좌표를 주소로 변환
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getAddress = async (lat, lng) => {
    const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // 여기에 API 키 입력
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const formattedAddress = data.results[0]?.formatted_address;
        setAddress(formattedAddress || "주소를 찾을 수 없습니다.");
      } else {
        console.error("Error fetching address:", data.status);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  return (
    <div>
      <h2>현재 위치</h2>
      <p>위도: {location.lat}</p>
      <p>경도: {location.lng}</p>
      <p>주소: {address}</p>
    </div>
  );
};

export default LocationFetcher;
