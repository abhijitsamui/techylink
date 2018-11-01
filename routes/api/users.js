const express = require("express");
const router = express.Router();

// @route GET api/users/test
// @desc Tests user route
// @access private
router.get("/test", (req, res) => res.json({ msg: "users work" }));

module.exports = router;
