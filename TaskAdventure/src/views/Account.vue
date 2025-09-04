<script setup>
import styles from "./Account.module.css";
    import XPBar from '@/components/XPBar.vue';
    import LevelBar from "@/components/LevelBar.vue";
    import { useTaskStore } from '@/store/tasks';

    const taskStore = useTaskStore();
    const maxXP = taskStore.getMaxXP;
    const currentXP = taskStore.getCurrentXP;
</script>
<template>
    <div :class="styles.container">
        <div :class="styles.statistica">
            <h1>My Statistics</h1>
        </div>
        <div :class="styles.info">
            <XPBar 
                :max = "maxXP"
                :current = "currentXP"
            />
            <LevelBar 
                :max = "maxXP"
                :current = "currentXP"
            />
        </div>
    </div>

    
    
</template>