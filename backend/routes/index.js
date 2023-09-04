const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
const Op = Sequelize.Op;
const { Item, Image } = require("../models");
router.get("/list", async (req, res) => {
  try {
    const list = await Item.findAll({ where: {}, include: { model: Image } });
    return res.status(200).json(list);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/search", async (req, res) => {
  try {
    const { category, name, unit, departs, use } = req.body;
    console.log(departs);

    const list = await Item.findAll({
      // departs: { [Op.in]: departs },
      where: {
        [Op.and]: [
          { [Op.and]: [{ use }, { name: { [Op.like]: `%${name}%` } }] },
          { [Op.and]: [{ use }, { departs: { [Op.in]: departs } }] },
        ],
      },
      //두개 이상의 조건을 묶을때는 각각의 조건에{}을 두르고 그룹에 []을 두르고 [Op]를 키값으로 ...
      include: { model: Image },
    });
    return res.status(200).json(list);
  } catch (e) {
    return res.status(400).json(e.message);
  }
  // const conditions = req.body;
  // console.log(conditions);
  // // const searchSplit = search.split("&");
  // // console.log(searchSplit[0]);
  // return res.status(200);
});
router.delete("/remove/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log(id);
    await Item.destroy({ where: { id } });
    await Image.destroy({ where: { ItemId: id } });
    const list = await Item.findAll({ include: { model: Image } });
    return res.status(200).json(list);
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;
