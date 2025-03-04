import { useEffect, useState } from "react";
import api from "../Api";
import { Link, useLocation, useNavigate } from "react-router-dom";

const WorkTime = () => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const [workPatterns, setWorkPatterns] = useState([]);
    const [workLists, setWorkLists] = useState([]);
    const [selectedDay, setSelectedDay] = useState(""); // 선택된 요일
    const [selectedPattern, setSelectedPattern] = useState(""); // 선택된 근무 패턴
    const navigate = useNavigate();

    const location = useLocation();
    const { worker_code } = location.state || {};

    useEffect(() => {
        const getWorkPattern = async () => {
            try {
                const response = await api.get("/workPattern/get", { withCredentials: true });
                setWorkPatterns(response.data);
                if (response.data === "common") {
                    navigate("/");
                }
            } catch (error) {
                console.error(error);
            }
        };
        getWorkPattern();
    }, []);

    // 요일 선택 처리
    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    // 근무 패턴 선택 처리
    const handlePatternChange = (event) => {
        setSelectedPattern(event.target.value);
    };

    // 근무 유형 등록
    const handleRegister = async () => {
        if (!selectedDay || !selectedPattern) {
            alert("요일과 근무 패턴을 선택하세요.");
            return;
        }

        const data = {
            day: selectedDay, // 선택된 요일 (0~6)
            worker_code: worker_code, // 직원 코드
            work_pattern_id: selectedPattern // 선택된 근무 패턴 ID
        };

        try {
            const response = await api.post("/workTime/register", data, { withCredentials: true });
            window.location.href = "workTime";
        } catch (error) {

        }
    };

    useEffect(() => {
        const serverData = async (e) => {
            try {
                const response = await api.post(
                    "/workTime/list",
                    { worker_code: worker_code }, // worker_code를 요청 본문에 포함
                    { withCredentials: true }
                );
                console.log(response.data)
                setWorkLists(response.data)

                if (response.data === "common") {
                    navigate("/");
                }
            } catch {

            }

        }
        serverData();
    }, []);


    return (
        <div className="work_time">
            <h2>근무 유형 설정</h2>

            <div style={{display : "flex" , flexDirection : "row", justifyContent : "center", gap : "100px"}}>

                {/* 요일 선택 */}
                <div>
                    <label htmlFor="daySelect">요일 선택: </label>
                    <select id="daySelect" value={selectedDay} onChange={handleDayChange}>
                        <option value="">요일을 선택하세요</option>
                        {weekdays.map((day, index) => (
                            <option key={index} value={index}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 근무 패턴 선택 */}
                {selectedDay !== "" && (
                    <div>
                        <label htmlFor="patternSelect">근무 패턴 선택: </label>
                        <select id="patternSelect" value={selectedPattern} onChange={handlePatternChange}>
                            <option value="">근무 패턴을 선택하세요</option>
                            {workPatterns.map((workPattern) => (
                                <option key={workPattern.work_pattern_id} value={workPattern.work_pattern_id}>
                                    {workPattern.work_pattern_name} ({workPattern.start_time}~{workPattern.end_time})
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* 등록 버튼 */}
                <div>
                    <button onClick={handleRegister}>근무유형 등록</button>
                </div>
            </div>



            <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                    <tr style={{ borderBottom: "2px solid" }}>
                        <td style={{ borderCollapse: "collapse", height: "50px", width: "300px" }}>요일</td>
                        <td style={{ width: "300px" }}>근무형태</td>
                        <td style={{ width: "300px" }}>출근시간</td>
                        <td style={{ width: "300px" }}>퇴근시간</td>
                        <td style={{ width: "300px" }}></td>
                        <td style={{ width: "300px" }}></td>
                    </tr>
                </tbody>

                {
                    workLists.map((workList, index) => {
                        return (

                            <tbody key={index}>
                                <tr style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ borderCollapse: "collapse", height: "50px" }}> {weekdays[workList.day]}</td>
                                    <td>  {workList.work_pattern.work_pattern_name}</td>
                                    <td>   {workList.work_pattern.start_time}</td>
                                    <td>   {workList.work_pattern.end_time}</td>
                                    <td>
                                        {/* Link를 사용해 work_code를 props로 전달 */}
                                        <Link to="/workTime" state={{ worker_code: workList.worker_code }}>
                                            <button style={{ height: "30px" }}>수정</button>
                                        </Link>
                                    </td>
                                    <td>
                                        {/* Link를 사용해 work_code를 props로 전달 */}
                                        <Link to="/workTime" state={{ worker_code: workList.worker_code }}>
                                            <button style={{ height: "30px" }}>삭제</button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
        </div>
    );
};

export default WorkTime;
