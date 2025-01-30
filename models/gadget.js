const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Gadget extends Model {}

Gadget.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        codename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
            defaultValue: 'Available',
        },
        decommissionedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Gadget',
        tableName: 'Gadgets',
    }
);

module.exports = Gadget;
