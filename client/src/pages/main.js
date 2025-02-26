import { useEffect, useState } from "react";
import "../css/main.css";
import Attendance from "./attendance/attendance";
import api from "../Api";

const Main = () => {
    const [user, setUser] = useState('');
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await api.get("/admin/auth", {
              withCredentials: true,
            });
            console.log(response.data)
            setUser(response.data);
            if (!response.data) {
            }
          } catch (error) {
            console.error("로그인 인증 실패:", error);
          }
        };
        fetchUser();
      }, []);

    return (
        <>
        <Attendance/>
        <div>현재 로그인된 사람 : {user}</div>
        </>
    )
}

export default Main;