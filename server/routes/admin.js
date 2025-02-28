
const express = require('express');
const router = express.Router();
const passport = require("passport");


router.post('/login', async (req, res, next) => {
    console.log("내가 왔다 ")

    passport.authenticate('admin', (error, user, info) => {
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

router.get("/auth", (req, res) => {
    res.json(req.user);
});

module.exports = router;