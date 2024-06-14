const { Progress } = require("../models");

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      where: { userId: req.params.id, courseId: req.query.courseId },
    });
    if (!progress) return res.status(404).send({ error: "Progress not found" });
    res.send(progress);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      where: { userId: req.params.id, courseId: req.body.courseId },
    });
    if (!progress) {
      await Progress.create({ ...req.body, userId: req.params.id });
    } else {
      await progress.update(req.body);
    }
    res.send(progress);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { getProgress, updateProgress };
