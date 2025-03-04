import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw", // 전체 너비
  height: "100vh", // 전체 높이
  position: "absolute", // 전체 화면을 채우도록 설정
  top: 0,
  left: 0,
};

const GOOGLE_MAPS_API_KEY = "AIzaSyDfiGSn8J5NJGOdDyo_wvyqZUg3yFfnazM"; // API 키 설정

const GoogleMapComponent = () => {
  const [location, setLocation] = useState({ lat: 35.82452387354769, lng: 128.75549284656674 }); // 기본 위치 (서울)
  const [permissionStatus, setPermissionStatus] = useState(null); // 위치 권한 상태

  // useEffect(() => {
  //   if ("permissions" in navigator) {
  //     navigator.permissions.query({ name: "geolocation" }).then((result) => {
  //       setPermissionStatus(result.state); // 권한 상태 저장

  //       if (result.state === "denied") {
  //         alert("위치 정보 사용이 차단되었습니다. 브라우저 설정에서 위치 액세스를 허용해주세요.");
  //       }
  //     });
  //   }

  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLocation({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         if (error.code === 1) {
  //           alert("위치 정보를 허용해주세요. 브라우저 설정에서 변경할 수 있습니다.");
  //         } else {
  //           console.error("Error fetching location:", error);
  //         }
  //       }
  //     );
  //   }
  // }, []);

  return (
    <div>
       {location.lat}{location.lng}
    </div>
    // <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
    //   <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
    //     <Marker position={location} />
    //   </GoogleMap>
    // </LoadScript>
  );
};

export default GoogleMapComponent;
