
const { owner } = require("../models");


const ownerInsert = async (data) => {
    console.log(data)

    try {
        const result = await owner.create({
            company_name: data.company_name,
            company_address: data.company_address,
            owner_id: data.owner_id,
            owner_pw: data.owner_pw,
            owner_name: data.owner_name,
            owner_phone: data.owner_phone,
            admin_auth: 'h',
            created_at: new Date(),
            updated_at: new Date(),
        });

        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    ownerInsert,
};