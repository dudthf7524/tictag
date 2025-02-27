const { admin } = require("../models");
const bcrypt = require("bcrypt");


const adminInsert = async (data) => {
    console.log(data)

    try {
        const result = await admin.create({
            admin_id: data.admin_id,
            admin_pw: data.admin_pw,
            company_code: data.company_code,
            admin_auth: data.admin_auth,
            admin_name: data.admin_name,
            admin_phone: data.admin_phone,
            created_at: new Date(),
            updated_at: new Date(),
        });
    } catch (error) {
        console.error(error)
    }
};

const login = async (admin_id, admin_pw) => {
    try {
        const resultLogin = await admin.findOne({
            where: { admin_id: admin_id },
            attributes: ["admin_id", "admin_name", "admin_pw", "admin_auth"],
            raw: true
        });

        console.log("resultLogin : " + resultLogin)

        if (!resultLogin) {

            return null;
        }
        // bcrypt를 사용하여 비밀번호 비교
        const resultPassword = await bcrypt.compare(
            admin_pw,
            resultLogin.admin_pw
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

module.exports = {
    adminInsert,
    login,
};