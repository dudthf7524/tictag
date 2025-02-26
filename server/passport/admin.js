const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const admin = require('../databases/admin');

module.exports = () => {

    passport.use(
        'admin',
        new LocalStrategy(
            {
                usernameField: "admin_id",
                passwordField: "admin_pw",
                passReqToCallback: true,
            },
            async (req, admin_id, admin_pw, done) => {
                console.log("admin")
                console.log("login_id :" + admin_id)
                console.log("password :" + admin_pw)
                try {
                    const result = await admin.login(admin_id, admin_pw);
                    console.log("result : " + result)
                    if (!result) {
                        return done(null, false, { reason: "존재하지 않는 사용자입니다." });
                    }

                    if (result) {
                        return done(null, result);
                    }
                    return done(null, false, { reason: "비밀번호가 틀렸습니다." });
                } catch (error) {
                    console.error(error);
                    return done(error);
                }
            }
        )
    );
};
