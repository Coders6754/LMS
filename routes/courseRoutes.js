const express = require("express");
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authenticateToken, getAllCourses);
router.get("/:id", authenticateToken, getCourse);
router.post("/", authenticateToken, authorizeRoles("teacher"), createCourse);
router.put("/:id", authenticateToken, authorizeRoles("teacher"), updateCourse);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("teacher"),
  deleteCourse
);

module.exports = router;
