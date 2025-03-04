const { workTime } = require("../models");
const { workPattern } = require("../models");

const workTimeInsert = async (data) => {
    try {
        const result = await workTime.create({
            worker_code: data.worker_code,
            work_pattern_id: data.work_pattern_id,
            day: data.day,
        });
    } catch (error) {
        console.error(error)
    }
};

const workTimeList = async (worker_code) => {
    try {
        const result = await workTime.findAll({
            where: {
                worker_code: worker_code,
            },
            attributes: ['work_time_id', 'day'], // 필요한 컬럼 선택
            include: [
                {
                    model: workPattern,
                    attributes: ['work_pattern_name', 'start_time', 'end_time'], // work_pattern 테이블에서 필요한 컬럼 선택
                },
            ],
            order: [
                ['day', 'ASC'], // day를 기준으로 오름차순 정렬
            ],
        });

        return result;
    } catch (error) {
        console.error('Error fetching work time with pattern:', error);
    }
};

module.exports = {
    workTimeInsert,
    workTimeList,

};