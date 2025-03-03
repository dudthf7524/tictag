
const express = require('express');
const authMiddlewareSC = require('../middleware/authMiddlewareSC');
const router = express.Router();
const workPattern = require('../databases/workPattern');

router.post("/register" , authMiddlewareSC, async (req, res) => {
    const data = req.body;
    const company_code  = req.user.company_code;
    try{
        await workPattern.workPatternInsert(company_code, data);
    }catch(error){
        console.log(error)
    }

});

router.get("/get" , authMiddlewareSC, async (req, res) => {
    const company_code  = req.user.company_code;
    try{
        const result =  await workPattern.workPatternGet(company_code);
        res.json(result)
    }catch(error){
        console.log(error)
    }
    

});

module.exports = router;