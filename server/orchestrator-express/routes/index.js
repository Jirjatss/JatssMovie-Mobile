const express = require("express");
const router = express();

router.use(require("./user"));
router.use(require("./movie"));

module.exports = router;
