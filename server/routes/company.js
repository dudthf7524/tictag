const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const company = require('../databases/company');
const admin = require('../databases/admin');
const worker = require('../databases/worker');


router.post('/register', async (req, res) => {
    console.log(req.body)
    var companyData = {};
    var adminData = {};
    var workerData = {};
    const owner_pw = await bcrypt.hash(req.body.owner_pw, 10);

    req.body.owner_pw = owner_pw;




    workerData.worker_id = req.body.owner_id;
    workerData.worker_pw = req.body.owner_pw;
    workerData.company_code = req.body.company_address;
    workerData.worker_grade = "대표";
    workerData.worker_name = req.body.owner_name;
    workerData.worker_phone = req.body.owner_phone;

    try {
        companyData.company_name = req.body.company_name;
        companyData.company_address = req.body.company_address;
        const company_code = await company.companyInsert(companyData);

        adminData.admin_id = req.body.owner_id;
        adminData.admin_pw = req.body.owner_pw;
        adminData.company_code = company_code;
        adminData.admin_name = req.body.owner_name;
        adminData.admin_phone = req.body.owner_phone;
        adminData.admin_auth = "M";

        workerData.worker_id = req.body.owner_id;
        workerData.worker_pw = req.body.owner_pw;
        workerData.company_code = company_code;
        workerData.worker_grade = "대표";
        workerData.worker_name = req.body.owner_name;
        workerData.worker_phone = req.body.owner_phone;

        if (company_code) {
            await admin.adminInsert(adminData);
            await worker.workerInsert(workerData);
        }
    } catch (error) {
        console.error('Error creating business', error.message);
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;