'use strict';
module.exports = (sequelize, DataTypes) => {
    const Step = sequelize.define('Payment', {
        price: DataTypes.DOUBLE,
        description: DataTypes.STRING,
        value: DataTypes.DOUBLE,
        date: DataTypes.DATE,
        type: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        tableName: 'payments'
    });
    Step.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };
    return Step;
};