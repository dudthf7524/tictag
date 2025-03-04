
const express = require('express');
const router = express.Router();
const passport = require("passport");
const authMiddlewareSC = require('../middleware/authMiddlewareSC');
const worker = require('../databases/worker');


router.post('/login', async (req, res, next) => {
    console.log("내가 왔다 ")
    passport.authenticate('worker', (error, user, info) => {
        console.log("user")
        console.log(user)
        console.log("user")
        if (error) return res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
        if (!user) return res.status(401).json({ message: info.message });

        req.login(user, (err) => {
            if (err) return next(err);

            // 세션 상태 확인

            return res.status(200).json({});
        });
    })(req, res, next);
})

router.get('/list', authMiddlewareSC, async (req, res, next) => {
    const company_code = req.user.company_code;
    console.log(company_code)
    try {
        const result = await worker.workerList(company_code);
        res.json(result)
    } catch (error) {
        console.log(error)
    }

})

module.exports = router;