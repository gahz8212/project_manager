const express = require("express");
const router = express.Router();
const { Item, Image } = require("../models");
router.get("/list", async (req, res) => {
  try {
    const list = await Item.findAll({ where: {}, include: { model: Image } });
    return res.status(200).json(list);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
module.exports = router;
