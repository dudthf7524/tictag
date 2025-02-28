
import "../css/main.css";
import Attendance from "./attendance/attendance";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";


const Main = () => {

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);







  const a = () => {
    navigate('/isworker')
  }




  const b = () => {
    if (user.role === 'worker') {
      alert('관리자가 아닙니다.')
      return;
    }
    navigate('/isadmin')
  }


  const c = () => {

    navigate('/loginAdmin')
  }


  const d = () => {

    navigate('/loginWorker')
  }

  return (
    <>
      <Attendance />
      <br></br>
      {
        user?.role === 'worker' ? (
          <div>현재 로그인된 사람 :  {user.worker_name} <br></br> 역할 : {user.role}</div>

        ) : user?.role === 'admin' ? (
          <div>현재 로그인된 사람 : {user.admin_name}  역할 : {user.role}</div>
        ) : (
          <div>
            <button onClick={c}>관리자 로그인</button>
            <br></br><br></br>
            <button onClick={d}>직원 로그인</button>
          </div>
        )
      }
      <br></br>
      <div>
        <button onClick={c}>관리자 로그인</button>
        <br></br><br></br>
        <button onClick={d}>직원 로그인</button>
      </div>
      <br></br>
      <button onClick={a}>출근/퇴근</button>
      <br></br>
      <br></br>
      <button onClick={b}>관리자페이지</button>
    </>
  )
}

export default Main;