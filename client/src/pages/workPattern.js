import { useEffect, useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [workPatterns, setworkPatterns] = useState([]);
    const [formData, setFormData] = useState({
        work_pattern_name: "",
        start_time: "",
        end_time: "",

    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    console.log(formData)

    const save = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                `/workPattern/register`,
                formData,
                { withCredentials: true }

            );
            console.log(response.data)

            if (response.data === "common") {
                navigate("/");
            } else {
                window.location.href ='workPattern'
            }
        } catch {

        }

    }
    useEffect(() => {
        const getWorkPattern = async (e) => {
            try {
                const response = await api.get(
                    `/workPattern/get`,
                    { withCredentials: true }

                );
                console.log(response.data)
                setworkPatterns(response.data)
                if (response.data === "common") {
                    navigate("/");
                }
            } catch {

            }

        }
        getWorkPattern();
    }, []);
    console.log(workPatterns)

    return (
        <div className="login">
            <br></br>
            <p>근로페턴을 설정해주세요</p>
            <br></br>
            <form onSubmit={save}>
                근로유형 : <input type="text" name="work_pattern_name" onChange={inputChange}></input>
                <br></br>

                출근시간 : <input type="text" name="start_time" onChange={inputChange}></input>
                <br></br>

                퇴근시간 : <input type="text" name="end_time" onChange={inputChange}></input>
                <br></br><br></br>

                <button>입력</button>
            </form>
            <br></br>
            <br></br>
            근로유형 리스트

            <table style={{ borderCollapse: "separate", borderSpacing: "50px" }}>
                <tbody>
                    <tr>
                        <td>근로유형</td>
                        <td>출근시간</td>
                        <td>퇴근시간</td>
                    </tr>
                </tbody>

                {
                    workPatterns.map((workPattern, index) => {
                        return (

                            <tbody key={index}>
                                <tr>
                                    <td> {workPattern.work_pattern_name}</td>
                                    <td>  {workPattern.start_time}</td>
                                    <td>  {workPattern.end_time}</td>
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