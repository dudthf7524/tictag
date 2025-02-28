import { useEffect, useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const IsAdmin = () => {
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
            if (response.data.role ==='worker') {
                alert('관리자가 아닙니다.')
                navigate('/')
            }
          } catch (error) {
            console.error("로그인 인증 실패:", error);
          }
        };
        fetchUser();
      }, []);

    return (
        <div className="login">
            <h1>관리자만 가능</h1>
        </div>
    )
}

export default IsAdmin;