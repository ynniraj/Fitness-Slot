const express = require("express");
const cors = require("cors");

const app = express();
const connect = require("./confiq/db");
const {
  createClasses,
  cancelClass,
  getClassesFilter,
  bookClasses,
  allClasses,
  getClassesById,
  getUserClasses,
} = require("./controllers/classes.controller");

app.use(cors());
app.use(express.json());

app.post("/api/add-classes", createClasses);
app.post("/api/book-classes", bookClasses);
app.post("/api/cancel-classes", cancelClass);
app.get("/api/all-classes", allClasses);
app.get("/api/all-classes/:id", getClassesById);
app.get("/api/getuser-classes", getUserClasses);
app.get("/api/filter-classes", getClassesFilter);

app.listen(8080, async () => {
  try {
    await connect();
    console.log("server is running on port 8080");
  } catch (e) {
    console.log(e);
  }
});
