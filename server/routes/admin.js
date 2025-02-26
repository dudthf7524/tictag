
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const owner = require('../databases/owner');

router.post('/admin/login', async (req, res, next) => {
    // passport.authenticate('local', (error, user, info) => {
    //     if (error) return res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
    //     if (!user) return res.status(401).json({ message: info.message });

    //     req.login(user, (err) => {
    //         if (err) return next(err);

    //         // 세션 상태 확인

    //         return res.status(200).json({
    //             message: '로그인 성공',
    //             user: {
    //                 id: user.login_id,
    //                 name: user.business_owner_name,
    //             },
    //         });
    //     });
    // })(req, res, next);
})