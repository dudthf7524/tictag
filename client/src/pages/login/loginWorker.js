import { useState } from "react";
import api from "../../Api";
import { useNavigate } from "react-router-dom";
const LoginWorker = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        worker_id: "",
        worker_pw: "",
    });
    
    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    



    const login = async () => {
        try {
            const response = await api.post(
                `/worker/login`,
                formData,
                { withCredentials: true }
            );
            console.log(response.data)
            if (response.status === 200) {
                setTimeout(() => {
                  navigate("/");
                }, 1000);
              }
        } catch (error) {
            console.log(error)
        }
    }


 


    return (
        <div className="login_worker" style={{ textAlign: "center" }}>
            <h1>사용자 로그인</h1>
            <br></br>
            <h2>아이디</h2>
            <input type="text" name="worker_id" placeholder="아이디를 입력해주세요" value={formData.worker_id} onChange={inputChange} />

            <h2>비밀번호</h2>
            <input type="text" name="worker_pw" placeholder="비밀번호를 입력해주세요" value={formData.worker_pw} onChange={inputChange} />
            <br></br>
            <br></br>
            <button style={{ width: "300px", height: "50px" }} onClick={login}>로그인</button>
        </div>
    );
};

export default LoginWorker;
