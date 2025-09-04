<script setup>
    import XPBar from '@/components/XPBar.vue';
    import { useTaskStore } from '@/store/tasks';

    const taskStore = useTaskStore();
    const maxXP = taskStore.getMaxXP;
    const currentXP = taskStore.getCurrentXP;
</script>
<template>
    <h2>Статистика:</h2>
    <XPBar 
        :max = "maxXP"
        :current = "currentXP"
    />
</template>