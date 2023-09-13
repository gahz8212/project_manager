const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
const Op = Sequelize.Op;
const { Item, Image } = require("../models");
const { isLoggedIn } = require("./middlewares");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, file.originalname);
    },
  }),
  limite: { fileSize: 5 * 1024 * 1024 },
});
router.get("/list", async (req, res) => {
  try {
    const list = await Item.findAll({
      where: {},
      include: { model: Image },
      order: [["id", "DESC"]],
    });
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
router.get("/read/:id", async (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    console.log(itemId);
    const item = await Item.findOne({
      where: { id: itemId },
      include: { model: Image },
    });
    return res.status(200).json(item);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
router.delete("/remove/:id", isLoggedIn, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    // console.log(id);
    await Item.destroy({ where: { id } });
    await Image.destroy({ where: { ItemId: id } });
    const list = await Item.findAll({ include: { model: Image } });
    return res.status(200).json(list);
  } catch (e) {
    console.error(e);
  }
});
router.post("/update", upload.array("images"), async (req, res) => {
  // console.log(req.files);
  try {
    const images = req.files.map((image) => ({
      url: `/img/${image.filename}`,
    }));
    // console.log(images);
    return res.status(200).json(images);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
});
router.patch("/update/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(id, req.body);
});
module.exports = router;
