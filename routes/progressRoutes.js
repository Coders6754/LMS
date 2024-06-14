const express = require("express");
const {
  getProgress,
  updateProgress,
} = require("../controllers/progressController");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/users/:id/progress", authenticateToken, getProgress);
router.post("/users/:id/progress", authenticateToken, updateProgress);

module.exports = router;
