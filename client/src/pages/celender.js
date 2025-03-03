import React, { useState } from "react";
import '../css/calender.css';

const SelectDatePage2 = () => {
    const [date, setDate] = useState(new Date());
    const [reservationDate, setReservationDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 각 요일별 출근시간과 퇴근시간 설정
    const workTimes = {
        Sunday: { start: "10:00", end: "18:00" },
        Monday: { start: "09:00", end: "18:00" },
        Tuesday: { start: "09:00", end: "17:00" },
        Wednesday: { start: "09:00", end: "18:00" },
        Thursday: { start: "08:30", end: "17:30" },
        Friday: { start: "09:00", end: "18:00" },
        Saturday: { start: "09:00", end: "18:00" },
    };

    // 요일 번호를 요일 이름으로 변환
    const getDayName = (dayIndex) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[dayIndex];
    };

    // 날짜를 렌더링하는 함수
    const renderCalendar = () => {
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth(); // 0부터 시작하는 이번 달 월

        // 이번 달의 마지막 날짜 계산
        const thisLast = new Date(viewYear, viewMonth + 1, 0);
        const TLDate = thisLast.getDate();

        // 이번 달의 첫 날
        const firstDay = new Date(viewYear, viewMonth, 1);
        const firstDayOfWeek = firstDay.getDay(); // 첫 날의 요일 (0: 일요일, 1: 월요일, ...)

        // 이번 달 날짜만 추출
        const thisDates = [...Array(TLDate).keys()].map(i => i + 1); // 1부터 시작하는 날짜 배열

        // 날짜를 렌더링할 때 첫 번째 날의 요일을 고려하여 렌더링
        const totalDays = [...Array(firstDayOfWeek).fill(''), ...thisDates]; // 첫 날의 요일에 맞춰 빈 칸 추가

        return totalDays.map((d, i) => {
            if (d === '') {
                return <div key={i} className="date empty"></div>; // 빈 칸 처리
            }

            const isToday =
                d === new Date().getDate() &&
                viewMonth === new Date().getMonth() &&
                viewYear === new Date().getFullYear();

            const dayOfWeek = new Date(viewYear, viewMonth, d).getDay();
            const workTime = workTimes[getDayName(dayOfWeek)]; // 요일 이름을 이용해 출근시간과 퇴근시간을 가져옵니다.

            return (
                <div
                    key={i}
                    className={`date ${isToday ? "today" : ""}`}
                    onClick={() => openModal(viewYear, viewMonth + 1, d)}
                >
                    <span className="day-number">{d}</span>
                    <div className="time-info">
                        <div>출근: {workTime.start}</div>
                        <div>퇴근: {workTime.end}</div>
                    </div>
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
