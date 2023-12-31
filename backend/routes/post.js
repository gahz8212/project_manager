const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { isLoggedIn } = require("./middlewares");
const { Item, Image } = require("../models");
try {
  fs.readdirSync("uploads");
} catch (e) {
  console.log("uploads 폴더를 새로 만듭니다.");
  fs.mkdirSync("uploads");
}
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
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post("/images", isLoggedIn, upload.array("images"), (req, res) => {
  try {
    const images = req.files.map((image) => ({
      url: `/img/${image.filename}`,
    }));
    return res.status(200).json(images);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
});
router.post("/item", isLoggedIn, upload.none(), (req, res) => {
  try {
    const { category, name, description, unit, price, departs, images, use } =
      req.body;
    // console.log(category, name);
    const nextDeparts = departs.filter((depart) => depart.count > 0);
    console.log(
      category,
      name,
      description,
      unit,
      price,
      nextDeparts,
      images,
      use
    );
    nextDeparts.map(async (depart) => {
      const item = await Item.create({
        category,
        name,
        description,
        departs: depart.depart,
        count: depart.count,
        unit,
        price,
        use,
      });
      if (images) {
        images.map(
          async (image) =>
            await Image.create({ url: image.url, ItemId: item.id })
        );
      }
    });
    return res.status(200).json("item_write_ok");
  } catch (e) {
    console.log(e);
    return res.status(400).json(e.message);
  }
});
module.exports = router;
