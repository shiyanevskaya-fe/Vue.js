<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import styles from './App.module.css';
</script>

<template>
  <!-- <div :class="styles.container">
    <nav>
      <RouterLink to="/"> Account </RouterLink>
      <RouterLink to="/tasks"> Tasks </RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div> -->
  <div :class="styles.screen">
    <div :class="styles.leftInfoPanel">
      <nav :class="styles.links">
        <RouterLink to="/"> Account </RouterLink>
        <RouterLink to="/tasks"> Tasks </RouterLink>
      </nav>
    </div>
    <div :class="styles.rightSection">
      <div :class="styles.topPanel"></div>
      <div :class="styles.mainSection">
        <RouterView />
      </div>
    </div>
  </div>
  
</template>
