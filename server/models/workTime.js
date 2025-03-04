module.exports = (sequelize, DataTypes) => {
    const workerTime = sequelize.define(
        'work_time',
        {
            work_time_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            worker_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            work_pattern_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            day: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
         
            timestamps: false,
            tableName: 'work_time',

        }
    );

    workerTime.associate = (db) => {
        // work_time은 하나의 work_pattern을 참조 (belongsTo)
        workerTime.belongsTo(db.workPattern, {
            foreignKey: 'work_pattern_id',
            targetKey: 'work_pattern_id',
        });
    };

    return workerTime;
};
