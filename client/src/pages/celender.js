import React, { useEffect, useState } from "react";
import '../css/calender.css';
import api from "../Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const SelectDatePage2 = () => {
    const [date, setDate] = useState(new Date());
    const [reservationDate, setReservationDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workLists, setWorkLists] = useState([]);

    // 각 요일별 출근시간과 퇴근시간 설정
    const initialWorkTimes = {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
    };
    const [workTimes, setWorkTimes] = useState(initialWorkTimes);

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);


    // 요일 번호를 요일 이름으로 변환
    const getDayName = (dayIndex) => {
        return dayIndex;  // 수정: 숫자 그대로 반환
    };



    useEffect(() => {
        const serverData = async (e) => {
            try {
                const response = await api.post(
                    "/workTime/list",
                    { worker_code: user.worker_code }, // worker_code를 요청 본문에 포함
                    { withCredentials: true }
                );
                console.log(response.data)
                setWorkLists(response.data)
                const updatedWorkTimes = { ...initialWorkTimes };

                // 서버에서 받은 데이터를 기반으로 workTimes 업데이트
                response.data.forEach((item) => {
                    updatedWorkTimes[item.day] = {
                        start: item.work_pattern.start_time,
                        end: item.work_pattern.end_time,
                    };
                });

                setWorkTimes(updatedWorkTimes);

                if (response.data === "common") {
                    navigate("/");
                }
            } catch {

            }

        }
        serverData();
    }, [user]);



    // 날짜를 렌더링하는 함수
    const renderCalendar = () => {
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth();
        const today = new Date(); 
        const todayDate = today.getDate(); 
        const todayMonth = today.getMonth(); // 오늘의 월
        const todayYear = today.getFullYear(); // 오늘의 연도

        const thisLast = new Date(viewYear, viewMonth + 1, 0);
        const TLDate = thisLast.getDate();
        const firstDay = new Date(viewYear, viewMonth, 1).getDay();

        const thisDates = [...Array(TLDate).keys()].map(i => i + 1);
        const totalDays = [...Array(firstDay).fill(''), ...thisDates];

        return totalDays.map((d, i) => {
            if (d === '') {
                return <div key={i} className="date empty"></div>;
            }

            const dayOfWeek = new Date(viewYear, viewMonth, d).getDay();
            const dayName = getDayName(dayOfWeek);
            const workTime = workTimes[dayName]; // 해당 요일의 출근/퇴근 시간 가져오기
            const isWeekend = workTime === null; // 휴무 여부 확인
            const isToday = (d === todayDate) && (viewMonth === todayMonth) && (viewYear === todayYear); // 오늘 날짜 비교
            return (
                <div
                    key={i}
                    className={`date ${isWeekend ? "weekend" : ""} ${isToday ? "today" : ""}`} 
                    onClick={!isWeekend ? () => openModal(viewYear, viewMonth + 1, d) : null}
                    style={{ cursor: isWeekend ? "not-allowed" : "pointer" }}
                >
                    <span className="day-number">{d}</span>
                    {isWeekend ? (
                        <div className="holiday-label">휴무</div>
                    ) : (
                        <div className="time-info">
                            <div>출근: {workTime.start}</div>
                            <div>퇴근: {workTime.end}</div>
                        </div>
                    )}
                </div>
            );
        });
    };
    // 모달 열기
    const openModal = (year, month, day) => {
        const formattedMonth = month.toString().padStart(2, "0");
        const formattedDay = day.toString().padStart(2, "0");
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
        setReservationDate(formattedDate);
        setIsModalOpen(true);
        const selectedDate = new Date(year, month - 1, day);
        const formattedSelectedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;
        console.log(`선택한 날짜: ${formattedSelectedDate}`);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 이전, 다음, 오늘 버튼 동작
    const changeMonth = (offset) => {
        setDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const goToday = () => {
        setDate(new Date());
    };

    // 캘린더 렌더링
    const calendarDays = renderCalendar();

    return (
        <div className='mid'>
            <div className="calender">
                <div className="header1">
                    <div className="year-month">{`${date.getFullYear()}년 ${date.getMonth() + 1
                        }월`}</div>
                    <div className="nav">
                        <button className="nav-btn go-prev" onClick={() => changeMonth(-1)}>
                            &lt;
                        </button>
                        <button className="nav-btn go-today" onClick={goToday}>
                            Today
                        </button>
                        <button className="nav-btn go-next" onClick={() => changeMonth(1)}>
                            &gt;
                        </button>
                    </div>
                </div>
                <div className="main">
                    <div className="days">
                        <div className="day">일</div>
                        <div className="day">월</div>
                        <div className="day">화</div>
                        <div className="day">수</div>
                        <div className="day">목</div>
                        <div className="day">금</div>
                        <div className="day">토</div>
                    </div>
                    <div className="dates">{calendarDays}</div>
                </div>
            </div>

            {/* 모달 내용 */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{reservationDate} 예약</h2>
                        <p>예약된 출근 시간: {workTimes[getDayName(new Date(reservationDate).getDay())].start}</p>
                        <p>예약된 퇴근 시간: {workTimes[getDayName(new Date(reservationDate).getDay())].end}</p>
                        <button onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectDatePage2;
