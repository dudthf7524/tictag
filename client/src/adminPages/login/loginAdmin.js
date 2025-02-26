import { useState } from "react";
import api from "../../Api";
import Address from 'react-daum-postcode';

const LoginAdmin = () => {
    
    const [formData, setFormData] = useState({
        admin_id: "",
        admin_pw: "",
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
                `/admin/login`,
                formData,
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error)
        }
    }


 


    return (
        <div className="login_admin" style={{ textAlign: "center" }}>
            <h1>관리자 로그인</h1>
            <br></br>
            <h2>아이디</h2>
            <input type="text" name="admin_id" placeholder="아이디를 입력해주세요" value={formData.admin_id} onChange={inputChange} />

            <h2>비밀번호</h2>
            <input type="text" name="admin_pw" placeholder="비밀번호를 입력해주세요" value={formData.admin_pw} onChange={inputChange} />
            <br></br>
            <br></br>
            <button style={{ width: "300px", height: "50px" }} onClick={login}>로그인</button>
        </div>
    );
};

export default LoginAdmin;
