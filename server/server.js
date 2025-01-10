const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const toDoRoutes = require("./routes/toDoRoutes");

const app = express();
const PORT = 5000;

// Sincronizar o banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Middlewares globais
app.use(cors());
app.use(express.json());

// Registro das rotas
app.use("/todos", toDoRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
