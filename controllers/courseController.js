const { Course, Lesson, User } = require("../models");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.send(courses);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, { include: Lesson });
    if (!course) return res.status(404).send({ error: "Course not found" });
    res.send(course);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = await Course.create({ ...req.body, teacherId: req.user.id });
    res.status(201).send(course);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course || course.teacherId !== req.user.id)
      return res.status(403).send({ error: "Not authorized" });
    await course.update(req.body);
    res.send(course);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course || course.teacherId !== req.user.id)
      return res.status(403).send({ error: "Not authorized" });
    await course.destroy();
    res.send({ message: "Course deleted" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
