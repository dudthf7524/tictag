
const { workPattern } = require("../models");
const workPatternInsert = async (company_code, data) => {
    console.log(data)

    try {
        const result = await workPattern.create({
            company_code: company_code,
            work_pattern_name: data.work_pattern_name,
            start_time: data.start_time,
            end_time: data.end_time,

        });
    } catch (error) {
        console.error(error)
    }
};

const workPatternGet = async (company_code) => {
   
    try {
        const result = await workPattern.findAll({
            where: { company_code : company_code },

        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    workPatternInsert,
    workPatternGet,

};