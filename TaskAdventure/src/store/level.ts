import { defineStore } from 'pinia';
import { useTaskStore } from './tasks';

export const useLevelStore = defineStore('level', {
  // Начальное состояние
  state: () => ({
    level: 1
  }),

  // Геттеры — аналог computed
  getters: {
    xpForNext: (state) => (state.level * 100),
  },

  // Действия — аналог методов
  actions: {
    checkLevel() {
      const taskStore = useTaskStore();
      const xp = taskStore.getCurrentXP;

      let newLevel = 1;
      let threshold = 100;

      while (xp >= threshold) {
        newLevel++;
        threshold += newLevel * 100;
      }

      this.level = newLevel;
    }
  }
});
