const { worker } = require("../models");


const workerInsert = async (data) => {
    console.log(data)

    try {
        const result = await worker.create({
            worker_id: data.worker_id,
            worker_pw: data.worker_pw,
            company_code: data.company_code,
            worker_grade: data.worker_grade,
            worker_name: data.worker_name,
            worker_phone: data.worker_phone,
            company_address: data.company_address,
            created_at: new Date(),
            updated_at: new Date(),
        });
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    workerInsert,
};