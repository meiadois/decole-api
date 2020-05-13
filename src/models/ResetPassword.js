'use strict';
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('ResetPassword', {
        user_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
        expiresAt: DataTypes.DATE,
    }, {
        tableName: 'reset_passwords'
    });
    Like.associate = function (models) {
        //this.belogsTo(models.User, { foreignKey: 'reset_password_id', as: 'user' });
    };
    return Like;
};