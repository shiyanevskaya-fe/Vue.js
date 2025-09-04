<script setup>
import { useTaskStore } from '@/store/tasks';
import { useLevelStore } from '@/store/level';
import { watch, computed } from 'vue';

const taskStore = useTaskStore();
const levelStore = useLevelStore();

watch(
  () => taskStore.getCurrentXP,
  () => {
    levelStore.checkLevel();
  },
  { immediate: true }
);

const pathLength = 350

const percent = computed(() => (levelStore.level / 50) * 100)
const offset = computed(() => pathLength * (1 - percent.value / 100))
</script>

<template>
  <div class="flex flex-col items-center">
    <svg xmlns="http://www.w3.org/2000/svg" height="200" width="200" viewBox="0 0 200 200">
      <!-- фон -->
      <path
        class="bg"
        stroke="#ccc"
        d="M41 149.5a77 77 0 1 1 117.93 0"
        fill="none"
        stroke-dasharray="350"
      />
      <!-- прогресс -->
      <path
        class="meter"
        stroke="#FFD700"
        d="M41 149.5a77 77 0 1 1 117.93 0"
        fill="none"
        :stroke-dasharray="pathLength"
        :stroke-dashoffset="offset"
      />
      <!-- текст -->
      <text
        x="100"
        y="110"
        text-anchor="middle"
        font-size="20"
        fill="#333"
      >
        {{ levelStore.level }}/{{ 50 }} lvl
      </text>
    </svg>
  </div>
</template>

<style scoped>
svg path {
  stroke-width: 20px;
  stroke-miterlimit: round;
  transition: stroke-dashoffset 850ms ease-in-out;
}
</style>
