const passport = require("passport");
const login = require("./login");

const { admin } = require("../models");
const { worker } = require("../models");
module.exports = async () => {
  try {
    await passport.serializeUser((user, done) => {
      if (user.worker_id) {
        process.nextTick(() => {
          done(null, { login_id: user.worker_id, login_name: user.worker_name, role: "worker" });
        })
      } else if (user.admin_id) {
        process.nextTick(() => {
          done(null, { login_id: user.admin_id, login_name: user.admin_name, role: "admin" });
        })
      }
    });
    
    await passport.deserializeUser(async (data, done) => {
      try {
        if (data.role === 'worker') {
          const user = await worker.findOne({
            where: { worker_id: data.login_id },
            attributes: ["worker_id", "worker_name"],
            raw: true
          });

          if (!user) {
            console.log("worker not found!");
            return done(null, false); // 사용자를 찾지 못했을 때, false 반환 (세션 종료)
          }
          user.role = data.role;
          done(null, user);
          
        } else if (data.role === 'admin') {
          const user = await admin.findOne({
            where: { admin_id: data.login_id },
            attributes: ["admin_id", "admin_name", "admin_auth"],
            raw: true
          });

          if (!user) {
            console.log("admin not found!");
            return done(null, false); // 사용자를 찾지 못했을 때, false 반환 (세션 종료)
          } else {
            user.role = data.role;
            done(null, user);
          }
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    });

    login();
    passport._debug = true;  // 디버깅 활성화

  } catch (e) {

  }

};



passport._debug = true;