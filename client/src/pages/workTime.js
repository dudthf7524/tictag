import { useEffect, useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
    const [workPatterns, setworkPatterns] = useState([]);
    const navigate = useNavigate();

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


    return (
        <div className="login">
            <br></br>
            <table style={{ textAlign: "center", fontSize: "20px", borderCollapse: "separate", borderSpacing: "50px" }}>
                <tbody>
                    <tr>
                        <td>월</td>
                        <td>화</td>
                        <td>수</td>
                        <td>목</td>
                        <td>금</td>
                        <td>토</td>
                        <td>일</td>
                    </tr>
                </tbody>


                <tbody>
                    <tr>
                        <td>
                            <select>
                                <option>
                                    근무 패턴 선택
                                </option>
                                {

                                    workPatterns.map((workPattern, index) => {
                                        return (
                                            <option key={index}>
                                                {workPattern.work_pattern_name}({workPattern.start_time}~{workPattern.end_time})
                                            </option>
                                        )

                                    })
                                }

                            </select>
                        </td>
                        <td>
                            <select>
                                <option>
                                    근무 패턴 선택
                                </option>
                                {

                                    workPatterns.map((workPattern, index) => {
                                        return (
                                            <option key={index}>
                                                {workPattern.work_pattern_name}({workPattern.start_time}~{workPattern.end_time})
                                            </option>
                                        )

                                    })
                                }
                            </select>
                        </td>
                        <td>
                            <select>
                                <option>
                                    근무 패턴 선택
                                </option>
                                {

                                    workPatterns.map((workPattern, index) => {
                                        return (
                                            <option key={index}>
                                                {workPattern.work_pattern_name}({workPattern.start_time}~{workPattern.end_time})
                                            </option>
                                        )

                                    })
                                }
                            </select>
                        </td>
                        <td>
                            <select>
                                <option>
                                    근무 패턴 선택
                                </option>
                                {

                                    workPatterns.map((workPattern, index) => {
                                        return (
                                            <option key={index}>
                                                {workPattern.work_pattern_name}({workPattern.start_time}~{workPattern.end_time})
                                            </option>
                                        )

                                    })
                                }
                            </select>
                        </td>
                        <td>
                            <select>
                                <option>
                                    근무 패턴 선택
                                </option>
                                {

                                    workPatterns.map((workPattern, index) => {
                                        return (
                                            <option key={index}>
                                                {workPattern.work_pattern_name}({workPattern.start_time}~{workPattern.end_time})
                                            </option>
                                        )

                                    })
                                }
                            </select>
                        </td>
                        <td>
                            <select>
                                <option>
                                    근무 패턴 선택
                                </option>
                                {

                                    workPatterns.map((workPattern, index) => {
                                        return (
                                            <option key={index}>
                                                {workPattern.work_pattern_name}({workPattern.start_time}~{workPattern.end_time})
                                            </option>
                                        )

                                    })
                                }
                            </select>
                        </td>
                        <td>
                            <select>
                                <option>
                                    근무 패턴 선택
                                </option>
                                {

                                    workPatterns.map((workPattern, index) => {
                                        return (
                                            <option key={index}>
                                                {workPattern.work_pattern_name}({workPattern.start_time}~{workPattern.end_time})
                                            </option>
                                        )

                                    })
                                }
                            </select>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td><button>근무유형등록</button></td>
                        <td><button>근무유형등록</button></td>
                        <td><button>근무유형등록</button></td>
                        <td><button>근무유형등록</button></td>
                        <td><button>근무유형등록</button></td>
                        <td><button>근무유형등록</button></td>
                        <td><button>근무유형등록</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Login;