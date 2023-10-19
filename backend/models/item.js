const Sequelize = require("sequelize");
module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: Sequelize.ENUM,
          values: ["소프트웨어", "하드웨어"],
          defaultValue: "하드웨어",
        },
        name: { type: Sequelize.STRING(100), allowNull: false },
        description: { type: Sequelize.STRING(200), allowNull: true },
        unit: {
          type: Sequelize.ENUM,
          values: ["$", "￦", "￥"],
          defaultValue: "￦",
        },
        price: { type: Sequelize.FLOAT(11, 4), defaultValue: 0 },
        departs: {
          type: Sequelize.ENUM,
          values: ["Off", "Dev", "Fac", "Pac"],
          defaultValue: "Off",
        },
        count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
        column: { type: Sequelize.STRING(15), defaultValue: "HEADER" },
        use: { type: Sequelize.BOOLEAN, defaultValue: true },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "Item",
        tableName: "items",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Item.belongsToMany(db.Item, {
      foreignKey: "lowerId",
      as: "Upper",
      through: "Relation",
    });
    db.Item.belongsToMany(db.Item, {
      foreignKey: "upperId",
      as: "Lower",
      through: "Relation",
    });
    db.Item.hasMany(db.Image);
    db.Item.hasMany(db.Item_old);
  }
};
