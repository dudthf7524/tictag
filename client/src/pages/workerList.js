import { useEffect, useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const [works, setWorks] = useState([]);

    useEffect(() => {
        const serverData = async (e) => {
            try {
                const response = await api.get(
                    `/worker/list`,
                    { withCredentials: true }

                );
                console.log(response.data)
                setWorks(response.data)
                if (response.data === "common") {
                    navigate("/");
                }
            } catch {

            }

        }
        serverData();
    }, []);

    return (
        <div className="login">
            <br></br>
            <p>근무자 리스트</p>

            <br></br>
            <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                    <tr style={{ borderBottom: "2px solid" }}>
                        <td style={{ borderCollapse: "collapse", height: "50px", width: "300px" }}>이름</td>
                        <td style={{ width: "300px" }}>직급</td>
                        <td style={{ width: "300px" }}>전화번호</td>
                        <td style={{ width: "300px" }}></td>
                    </tr>
                </tbody>

                {
                    works.map((work, index) => {
                        return (

                            <tbody key={index}>
                                <tr style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ borderCollapse: "collapse", height: "50px" }}> {work.worker_name}</td>
                                    <td>  {work.worker_grade}</td>
                                    <td>  {work.worker_phone}</td>
                                    <td>
                                        {/* Link를 사용해 work_code를 props로 전달 */}
                                        <Link to="/workTime" state={{ worker_code: work.worker_code }}>
                                            <button style={{ height: "30px" }}>근무설정</button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default Login;