<script setup lang="ts">
    import { reactive } from 'vue';
    import TaskList from '@/components/TaskList.vue';
    import TaskForm from '@/components/TaskForm.vue';
    import styles from "./Tasks.module.css";
    import type { Task } from "@/interfaces/Task";
    import { computed, ref, watch } from 'vue';
    import { useTaskStore } from '@/store/tasks';

    const filterTask = ref(false);

    const taskStore = useTaskStore();

    function createNewTask(task: Task) : void{
        taskStore.addNewTask(task);
    }

    const tasks = computed<Task[]>(() => {
    return filterTask.value
        ? taskStore.completedTasks
        : taskStore.pendingTasks;
    });
</script>
<template>
    <section :class="styles.tasks">
        <div>
            <TaskForm 
                @create="createNewTask"
                :id="taskStore.lastID"
            />
        </div>
        <div :class="styles.container">
            <select v-model="filterTask">
                <option :value=false>Задачи</option>
                <option :value=true>Завершенные</option>
            </select>
            <TaskList 
                :tasks="tasks"
            />
        </div>
    </section>    
</template>