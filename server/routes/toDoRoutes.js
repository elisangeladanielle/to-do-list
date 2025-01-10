const express = require("express");
const router = express.Router();
const toDoController = require("../controllers/toDoController");

router.get("/", toDoController.getAllToDos);
router.post("/", toDoController.createToDo);
router.put("/:id", toDoController.updateToDo);
router.delete("/:id", toDoController.deleteToDo);

module.exports = router;
