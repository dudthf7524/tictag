import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WORKER_LOGIN_REQUEST } from "../../reducers/worker";
import { useDispatch, useSelector } from "react-redux";

const LoginWorker = () => {

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

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);


    const login = (e) => {
        e.preventDefault();
        dispatch({
            type: WORKER_LOGIN_REQUEST,
            data: formData,
        });
    };


    return (
        <div className="login_worker" style={{ textAlign: "center" }}>
            <h1>직원 로그인</h1>
            {
                user?.role === 'worker' ? (
                    <div> {user.worker_name}님 로그인 완료</div>
                ) : (
                    <form onSubmit={login}>
                        <h2>아이디</h2>
                        <input type="text" name="worker_id" placeholder="아이디를 입력해주세요" value={formData.worker_id} onChange={inputChange} />

                        <h2>비밀번호</h2>
                        <input type="password" name="worker_pw" placeholder="비밀번호를 입력해주세요" value={formData.worker_pw} onChange={inputChange} />

                        <br /><br />
                        <button type="submit" style={{ width: "300px", height: "50px" }}>로그인</button> {/* 버튼 타입 변경 */}
                    </form>
                )

            }
        </div>
    );
};

export default LoginWorker;
