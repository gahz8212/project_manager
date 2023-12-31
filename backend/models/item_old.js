const Sequelize = require("sequelize");
module.exports = class Item_old extends Sequelize.Model {
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
        use: { type: Sequelize.BOOLEAN, defaultValue: true },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "Item_old",
        tableName: "items_old",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // db.Item_old.belongsToMany(db.Item_old, {
    //   foreignKey: "lowerId",
    //   as: "Upper",
    //   through: "Relation",
    // });
    // db.Item_old.belongsToMany(db.Item_old, {
    //   foreignKey: "upperId",
    //   as: "Lower",
    //   through: "Relation",
    // });
    // db.Item.hasMany(db.Image);
    db.Item_old.belongsTo(db.Item);
  }
};
