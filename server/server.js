const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');




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

