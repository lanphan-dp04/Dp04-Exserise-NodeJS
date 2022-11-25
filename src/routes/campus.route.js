const express = require("express");

const router = express.Router();

const campusControllor = require("../app/controllers/CampusControllor");
const upload = require("../util/multer");
const { checkAuth } = require("../util");

router.get("/api", campusControllor.get);
router.get("/list",checkAuth, campusControllor.show);
router.post("/create",checkAuth,upload.single('avatar'), campusControllor.create);
router.get("/:id/edit",checkAuth, campusControllor.edit);
router.put("/:id",checkAuth,upload.single('avatar'), campusControllor.update);
router.delete("/:id", checkAuth,campusControllor.delete);
router.delete("/:id/force",checkAuth, campusControllor.forceDelete);

module.exports = router;
