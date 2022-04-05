const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

router.get("/", deviceController.getDevices);

router.get("/:deviceId", deviceController.getDeviceById);

router.post("/", deviceController.createDevice);

router.patch("/:deviceId", deviceController.updateDevice);

router.delete("/:deviceId", deviceController.removeDevice);

module.exports = router;
