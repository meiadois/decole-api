'use strict';
module.exports = (sequelize, DataTypes) => {
    const Requirement = sequelize.define('RouteRequirement', {
    }, {
        tableName: 'route_requirements'
    });
    Requirement.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.Route, { foreignKey: 'required_route_id', as: 'required_route' });
        this.belongsTo(models.Route, { foreignKey: 'route_id', as: 'route' });
    };
    return Requirement;
};