const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const progressRoutes = require("./routes/progressRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerDocs = require("./docs/swagger");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/progress", progressRoutes);

swaggerDocs(app);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync({ force: true });
});
