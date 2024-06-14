const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./user")(sequelize, Sequelize);
db.Course = require("./course")(sequelize, Sequelize);
db.Lesson = require("./lesson")(sequelize, Sequelize);
db.Progress = require("./progress")(sequelize, Sequelize);

// Define relationships
db.Course.hasMany(db.Lesson, { onDelete: "CASCADE" });
db.Lesson.belongsTo(db.Course);

db.User.belongsToMany(db.Course, { through: db.Progress });
db.Course.belongsToMany(db.User, { through: db.Progress });

module.exports = db;
