const express = require('express');
const authMiddlewareSC = require('../middleware/authMiddlewareSC');
const router = express.Router();
const workTime = require('../databases/workTime');



router.post("/register", authMiddlewareSC, async (req, res) => {
    const data = req.body;
    try {
        await workTime.workTimeInsert(data);
        return res.json("1");
    } catch (error) {
        console.log(error)
    }

});


router.post("/list", authMiddlewareSC, async (req, res) => {
    
    const worker_code = req.body.worker_code;
    try {
        const result = await workTime.workTimeList(worker_code);
        return res.json(result);
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;