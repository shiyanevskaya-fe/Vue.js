<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import styles from './App.module.css';
</script>

<template>
  <div :class="styles.container">
    <nav>
      <RouterLink to="/"> Account </RouterLink>
      <RouterLink to="/tasks"> Tasks </RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
  
</template>

<style scoped>
a{
  text-decoration: none;
  color: black;
}

a:hover{
  transform: scale(1.05);
}

nav {
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-bottom: 24px;
  margin-top: 12px;
}
</style>
