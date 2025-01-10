const express = require("express");
const { Op } = require("sequelize"); // Sequelize operator for search
const { ToDo } = require("../models/toDoModel");

const router = express.Router();

// 1. Listar todos os To Dos (com filtros, busca e ordenação)
router.get("/", async (req, res) => {
  const { search, filter, sort } = req.query;

  let whereClause = {};
  if (filter === "Completed") {
    whereClause.isCompleted = true;
  } else if (filter === "Incomplete") {
    whereClause.isCompleted = false;
  }

  if (search) {
    whereClause.text = { [Op.like]: `%${search}%` };
  }

  const orderClause = sort === "Desc" ? [["text", "DESC"]] : [["text", "ASC"]];

  try {
    const toDos = await ToDo.findAll({ where: whereClause, order: orderClause });
    res.json(toDos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch to dos" });
  }
});

// 2. Criar um novo To Do
router.post("/", async (req, res) => {
  const { text, category } = req.body;

  try {
    const newToDo = await ToDo.create({ text, category, isCompleted: false });
    res.status(201).json(newToDo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create to do" });
  }
});

// 3. Atualizar um To Do (marcar como completo/incompleto)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  try {
    const toDo = await ToDo.findByPk(id);
    if (!toDo) return res.status(404).json({ error: "To Do not found" });

    toDo.isCompleted = isCompleted;
    await toDo.save();

    res.json(toDo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update to do" });
  }
});

// 4. Remover um To do
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const toDo = await ToDo.findByPk(id);
    if (!toDo) return res.status(404).json({ error: "To Do not found" });

    await toDo.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete To Do" });
  }
});

module.exports = router;
