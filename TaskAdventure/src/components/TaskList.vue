<script setup lang="ts">
    import TaskItem from './TaskItem.vue';
    import TaskForm from './TaskForm.vue';
    import type { Task } from '../interfaces/Task';
    import { computed, defineProps, reactive } from 'vue';
    import style from './TaskList.module.css';

    const props = defineProps< {'tasks' : Task[]} >();
    const emits = defineEmits(['create']);

</script>
<template>
    <div :class="style.taskList">
        <TaskItem
            v-for="task in tasks"
            :task="task"
        />
    </div>
</template>
<style></style>