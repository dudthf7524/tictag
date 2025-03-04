module.exports = (sequelize, DataTypes) => {
    const worker = sequelize.define(
        'worker',
        {
            worker_code: {
                type: DataTypes.INTEGER, // 숫자 타입으로 변경
                allowNull: false,
                primaryKey: true,
                autoIncrement: true, // 자동 증가 설정
            },
            worker_id: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },
            worker_pw: {
                type: DataTypes.STRING(100),
                allowNull: false,
                defaultValue: '',
            },
            company_code: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            worker_grade: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: '',
            },
            worker_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            worker_phone: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: '',
            },
           
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
            underscored: true,
            tableName: 'worker',
            
        }
    );

    worker.associate = (db) => {
        // 관계 설정이 필요한 경우 여기에 추가
    };

    return worker;
};
