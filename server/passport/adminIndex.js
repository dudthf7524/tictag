const passport = require("passport");
const admin = require("./admin");


const { owner } = require("../models");

module.exports = async () => {
  try {
    await passport.serializeUser((user, done) => {
      console.log("user : " + user)
      console.log("user : " + user)
      console.log(JSON.stringify(user, null, 2));
      console.log("여기까지");

      console.log(user.owner_id, user.owner_name)
      process.nextTick(() => {
        done(null, { id: user.owner_id, owner_name: user.owner_name });
      })
  
    });
    await passport.deserializeUser(async (data, done) => {
      console.log("data.id : "+ data.id )
      console.log("data.id : "+ data.id )
      console.log("data.id : "+ data.id )
      console.log("data.id : "+ data.id )
      console.log("data.id : "+ data.id )
      console.log("data.id : "+ data.id )
      try {
        const user = await owner.findOne({ where: { owner_id: data.id } });
        console.log("user : " + user)
        console.log(JSON.stringify(user, null, 2));
        if (!user) {
          console.log("User not found!");
          return done(null, false); // 사용자를 찾지 못했을 때, false 반환 (세션 종료)
        }
        console.log(user.registrationNumber)
        user.registrationNumber = data.registrationNumber;
        console.log(JSON.stringify(user, null, 2));
        done(null, user);
      } catch (error) {
        console.error(error);
        done(error);
      }
    });
  
    admin();
  } catch(e) {

  }
 
};

passport._debug = true;