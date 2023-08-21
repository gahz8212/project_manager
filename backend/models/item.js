const Sequelize = require("sequelize");
module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: { type: Sequelize.STRING(100), unique: true, allowNull: false },
        unit: {
          type: Sequelize.ENUM,
          values: ["$", "￦", "￥"],
          defaultValue: "￦",
        },
        price: { type: Sequelize.FLOAT(11, 4), defaultValue: 0 },
        departs: { type: Sequelize.ENUM, values: ["Off", "Dev", "Man", "Pac"] },
        use: { type: Sequelize.BOOLEAN, defaultValue: false },
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
  }
};
