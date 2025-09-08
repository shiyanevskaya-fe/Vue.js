import express from "express";
import mysql from "mysql2/promise";
import cors from 'cors';

export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",       
  password: "", 
  database: "task_adventure"
});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/tasks", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при получении задач" });
  }
});

// Добавление новой задачи
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, difficulty, xp } = req.body;

    const [result] = await db.query(
      "INSERT INTO tasks (title, description, difficulty, xp) VALUES (?, ?, ?, ?)",
      [title, description, difficulty, xp]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      difficulty,
      completed: false,
      xp
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при добавлении задачи" });
  }
});

// Удаление задачи по id
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при удалении задачи" });
  }
});

// Обновление задачи
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, difficulty, completed, xp } = req.body;

    await db.query(
      "UPDATE tasks SET completed=? WHERE id=?",
      [completed ? 1 : 0, id]
    );

    res.json({ id: Number(id), title, description, difficulty, completed, xp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при обновлении задачи" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});