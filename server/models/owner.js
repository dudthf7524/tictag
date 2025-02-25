module.exports = (sequelize, DataTypes) => {
    const owner = sequelize.define(
        'owner',
        {
            company_code: {
                type: DataTypes.INTEGER, // 숫자 타입으로 변경
                allowNull: false,
                primaryKey: true,
                autoIncrement: true, // 자동 증가 설정
            },
            company_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            company_address: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            owner_id: {
                type: DataTypes.STRING(30),
                allowNull: false,
                primaryKey: true,
            },
            owner_pw: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            owner_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            owner_phone: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: '',
            },
            admin_auth: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
           
           
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
            underscored: true,
            tableName: 'owner',
        }
    );

    owner.associate = (db) => {
        // 관계 설정이 필요한 경우 여기에 추가
    };

    return owner;
};
