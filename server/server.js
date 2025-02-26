const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const owner = require("./routes/owner");
const admin = require("./routes/admin");
const router = require('./routes/owner');
const passport = require("passport");
const session = require("express-session");

const passportConfig = require("./passport");
const app = express();



const PORT = 8080;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


(async () => {
    try {
        // ✅ 데이터베이스 동기화
        //await sequelize.sync({ alter: true });
        await sequelize.sync({ force: false });
        console.log("✅ 데이터베이스 연결 완료");
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ 서버 시작 중 오류 발생:", error);
    }
})();


passportConfig();


app.use(passport.initialize());

app.use(
    session({
        secret: "암호화에 쓸 비번", // 세션 암호화 키
        resave: false,
        saveUninitialized: false,
        credentials: true,
        cookie: {
            httpOnly: true, // 클라이언트에서 쿠키를 접근하지 못하도록
            secure: false, // HTTPS에서만 작동하도록 설정
            // secure: true, // HTTPS에서만 작동하도록 설정
            // sameSite: "None", // 크로스 도메인에서 세션 유지
            maxAge: 24 * 60 * 60 * 1000, // 쿠키 만료 시간 설정 (1일)
        },
    })
);

app.use(passport.session());

app.use(express.json());
app.use(router);

app.use("/admin", admin);
app.use("/owner", owner);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
