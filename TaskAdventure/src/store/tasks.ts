import { defineStore } from 'pinia';
import type { Task } from '@/interfaces/Task';

export const useTaskStore = defineStore('tasks', {
  // Начальное состояние
  state: () => ({
    tasks: [
        { id: 1, title: "Пройти туториал Vue 3", description: "Изучить основы компонентов и реактивности", difficulty: "low", completed: false, xp: 50 },
        { id: 2, title: "Создать TaskForm", description: "Реализовать форму добавления задач с валидацией", difficulty: "high", completed: false, xp: 100 },
        { id: 3, title: "Добавить маршрутизацию", description: "Настроить Vue Router и динамические маршруты", difficulty: "medium", completed: true, xp: 70 }
    ] as Task[]
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
    addNewTask(task : Task) {
        this.tasks.push(task);
    }
  }
});
