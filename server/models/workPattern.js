module.exports = (sequelize, DataTypes) => {
    const worker = sequelize.define(
        'work_pattern',
        {
            work_pattern_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            company_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                
            },
            work_pattern_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            start_time: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: '',
            },
            end_time: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
         
            timestamps: false,
            tableName: 'work_pattern',

        }
    );

    worker.associate = (db) => {
        // 관계 설정이 필요한 경우 여기에 추가
    };

    return worker;
};
