module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define(
        'admin',
        {
            admin_id: {
                type: DataTypes.STRING(30),
                allowNull: false,
                primaryKey: true,
            },
            admin_pw: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            company_code: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            admin_auth: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: '',
            },
            admin_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            admin_phone: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: '',
            },
           
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
            underscored: true,
            tableName: 'admin',
        }
    );

    admin.associate = (db) => {
        // 관계 설정이 필요한 경우 여기에 추가
    };

    return admin;
};
