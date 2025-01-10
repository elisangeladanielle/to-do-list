const { ToDo } = require("../models");

const getAllToDos = async (req, res) => {
  try {
    const toDos = await ToDo.findAll();
    res.json(toDos);
  } catch (error) {
    res.status(500).json({ message: "Error loading all to dos", error });
  }
};

const createToDo = async (req, res) => {
  const { text, category, isCompleted } = req.body;

  try {
    const newToDo = await ToDo.create({ text, category, isCompleted });
    res.status(201).json(newToDo);
  } catch (error) {
    res.status(400).json({ message: "Error creating to do", error });
  }
};

const updateToDo = async (req, res) => {
  const { id } = req.params;
  const { text, category, isCompleted } = req.body;

  try {
    const toDo = await ToDo.findByPk(id);
    if (!toDo) {
      return res.status(404).json({ message: "To do not found" });
    }

    toDo.text = text;
    toDo.category = category;
    toDo.isCompleted = isCompleted;
    await toDo.save();

    res.json(toDo);
  } catch (error) {
    res.status(400).json({ message: "Error updating to do", error });
  }
};

const deleteToDo = async (req, res) => {
  const { id } = req.params;

  try {
    const toDo = await ToDo.findByPk(id);
    if (!toDo) {
      return res.status(404).json({ message: "To do not found" });
    }

    await toDo.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Error deleting to do", error });
  }
};

module.exports = {
  getAllToDos,
  createToDo,
  updateToDo,
  deleteToDo,
};
