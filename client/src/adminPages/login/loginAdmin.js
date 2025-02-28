import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADMIN_LOGIN_REQUEST } from "../../reducers/admin";
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
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const login = (e) => {
        e.preventDefault();
        dispatch({
            type: ADMIN_LOGIN_REQUEST,
            data: formData,
        });
    };



    return (
        <div className="login_admin" style={{ textAlign: "center" }}>
            <h1>관리자 로그인</h1>

            {
                user?.role === 'admin' ? (
                    <div> {user.admin_name}님 로그인 완료</div>
                ) : (
                    <form onSubmit={login}> {/* 폼 태그 사용 */}
                        <h2>아이디</h2>
                        <input type="text" name="admin_id" placeholder="아이디를 입력해주세요" value={formData.admin_id} onChange={inputChange} />

                        <h2>비밀번호</h2>
                        <input type="password" name="admin_pw" placeholder="비밀번호를 입력해주세요" value={formData.admin_pw} onChange={inputChange} />

                        <br /><br />
                        <button type="submit" style={{ width: "300px", height: "50px" }}>로그인</button> {/* 버튼 타입을 submit으로 변경 */}
                    </form>
                )
            }

        </div>
    );

};

export default LoginAdmin;
