const express = require("express");
const router = express.Router();
const attachmentController = require("../controllers/attachmentcontroller");

router.get("/", attachmentController.getAllAttachments);
router.get("/:id", attachmentController.getAttachmentById);
router.post("/create", attachmentController.registerAttachment);
router.patch("/update/:id", attachmentController.updateAttachment);
router.delete("/delete/:id", attachmentController.deleteAttachment);

module.exports = router;
