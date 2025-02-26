
const { company } = require("../models");


const companyInsert = async (data) => {
  console.log(data)

  try {
    const result = await company.create({
      company_name: data.company_name,
      company_address: data.company_address,
      created_at: new Date(),
      updated_at: new Date(),
    });
    console.log(result.company_code)
    return result.company_code;
  } catch (error) {
    console.error(error)
  }
};

module.exports = {
  companyInsert,
};