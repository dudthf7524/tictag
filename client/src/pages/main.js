import { useEffect, useState } from "react";
import "../css/main.css";
import Attendance from "./attendance/attendance";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

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
  const a = () => {
    navigate('/isworker')
  }

  const b = () => {
    if(user.role === 'worker'){
      alert('관리자가 아닙니다.')
      return;
    }
    navigate('/isadmin')
  }

  return (
    <>
      <Attendance />
      <div>현재 로그인된 사람 : {user.admin_name}{user.role}</div>
      <br></br>
      <button onClick={a}>출근/퇴근</button>
      <br></br>
      <br></br>
      <button onClick={b}>관리자페이지</button>
    </>
  )
}

export default Main;