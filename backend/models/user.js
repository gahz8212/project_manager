const Sequelize = require("sequelize");
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: { type: Sequelize.STRING(100), unique: true, allowNull: false },
        name: { type: Sequelize.STRING(10), allowNull: false },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        rank: {
          type: Sequelize.ENUM,
          values: ["대표", "부장", "차장", "과장", "대리", "사원", "님"],
        },
        status: { type: Sequelize.BOOLEAN, defaultValue: false },
        loginAt: { type: "TIMESTAMP" },
        logoutAt: { type: "TIMESTAMP" },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
