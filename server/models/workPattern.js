module.exports = (sequelize, DataTypes) => {
    const workerPattern = sequelize.define(
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

    workerPattern.associate = (db) => {
        // work_pattern은 여러 개의 work_time을 가질 수 있음 (hasMany)
        workerPattern.hasMany(db.workTime, {
            foreignKey: 'work_pattern_id',
            sourceKey: 'work_pattern_id',
        });
    };

    return workerPattern;
};
