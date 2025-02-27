const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const worker = require("./routes/worker");
const admin = require("./routes/admin");
const company = require("./routes/company");
const router = require('./routes/company');
const passport = require("passport");
const session = require("express-session");
const path = require('path'); // path 모듈 추가

const passportConfig = require("./passport/cookie");

const app = express();

const PORT = 8080;
passportConfig();

app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // CORS에서만 credentials 설정
}));

(async () => {
    try {
        // ✅ 데이터베이스 동기화
        await sequelize.sync({ force: false });
        console.log("✅ 데이터베이스 연결 완료");
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ 서버 시작 중 오류 발생:", error);
    }
})();


app.use(passport.initialize());

app.use(
    session({
        secret: "암호화에 쓸 비번", // 세션 암호화 키
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true, // 클라이언트에서 쿠키를 접근하지 못하도록
            secure: false, // HTTPS에서만 작동하도록 설정
            maxAge: 24 * 60 * 60 * 1000, // 쿠키 만료 시간 설정 (1일)
        },
    })
);

app.use(passport.session());

app.use(express.static(path.join(__dirname, "./build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.use(router);


app.get("/admin/auth", (req, res) => {
    console.log('aaaaaaa')
    console.log(req.user.role)
    
    console.log('aaaaaaa')
    res.json(req.user);
    
});

app.use("/worker", worker);
app.use("/admin", admin);
app.use("/company", company);

// 빌드된 React 앱을 제공하는 경로
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});
