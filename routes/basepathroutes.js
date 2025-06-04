const express = require("express");
const router = express.Router();
const basePathController = require("../controllers/basePathcontroller");

router.get("/active", basePathController.getActiveBasePath);
router.get("/", basePathController.getAllBasePaths);
router.post("/create", basePathController.registerBasePath);
router.patch("/update/:id", basePathController.updateBasePath);
router.delete("/:id", basePathController.deleteBasePath);

module.exports = router;
