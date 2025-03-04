const { worker } = require("../models");
const bcrypt = require("bcrypt");


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

const login = async (worker_id, worker_pw) => {
    try {
        const resultLogin = await worker.findOne({
            where: { worker_id: worker_id },
            attributes: ["worker_id", "worker_pw", "worker_name"],
            raw: true
        });

        console.log("resultLogin : " + resultLogin)

        if (!resultLogin) {

            return null;
        }
        // bcrypt를 사용하여 비밀번호 비교
        const resultPassword = await bcrypt.compare(
            worker_pw,
            resultLogin.worker_pw
        );

        console.log("resultPassword : " + resultPassword)

        if (!resultPassword) {
            return null; // 비밀번호 불일치하면 null 반환
        }

        // 사업자가 존재하면 해당 사업자 객체 반환
        return resultLogin;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch business data");
    }
};


const workerList = async (company_code) => {
   
    try {
        const result = await worker.findAll({
            where: { company_code : company_code },
            attributes: ["worker_code", "worker_name", "worker_grade", "worker_name", "worker_phone"],


        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    workerInsert,
    login,
    workerList,
};