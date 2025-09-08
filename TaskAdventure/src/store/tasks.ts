import { defineStore } from 'pinia';
import type { Task } from '@/interfaces/Task';

export const useTaskStore = defineStore('tasks', {
  // Начальное состояние
  state: () => ({
    tasks: [] as Task[]
  }),

  // Геттеры — аналог computed
  getters: {
    completedTasks: (state) => state.tasks.filter(t => t.completed),
    pendingTasks: (state) => state.tasks.filter(t => !t.completed),
    lastID: (state) => state.tasks.length + 1,
    getMaxXP: (state) => {
        let maxXP = 0;
        state.tasks.forEach(task => maxXP += task.xp);
        return maxXP;
    },
    getCurrentXP: (state) => {
        let xp = 0;
        state.tasks.forEach(task => {
            task.completed ? xp += task.xp : xp += 0;
        });

        return xp;
    }
  },

  // Действия — аналог методов
  actions: {
    async fetchTasks() {
      try {
        const res = await fetch("http://localhost:3000/tasks");
        const data = await res.json();
        this.tasks = data;
      } catch (err) {
        console.error("Ошибка при загрузке задач:", err);
      }
    },
    async addNewTask(task: Omit<Task, "id">) {
      try {
        const res = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        const newTask = await res.json();
        this.tasks.push(newTask);
      } catch (err) {
        console.error("Ошибка при добавлении задачи:", err);
      }
    },
    async updateTask(task: Task) {
      try {
        const res = await fetch(`http://localhost:3000/tasks/${task.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        const updated = await res.json();
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) this.tasks[index] = updated;
      } catch (err) {
        console.error("Ошибка при обновлении задачи:", err);
      }
    },

    async deleteTask(id: number) {
      try {
        await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
        this.tasks = this.tasks.filter(t => t.id !== id);
      } catch (err) {
        console.error("Ошибка при удалении задачи:", err);
      }
    },
  }
});
