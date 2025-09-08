<script setup lang="ts">
    import { reactive } from 'vue';
    import TaskList from '@/components/TaskList.vue';
    import TaskForm from '@/components/TaskForm.vue';
    import styles from "./Tasks.module.css";
    import type { Task } from "@/interfaces/Task";
    import { ref, onMounted } from 'vue';
    import { useTaskStore } from '@/store/tasks';
    import BaseModal from '@/components/BaseModal.vue';

    const taskStore = useTaskStore();
    onMounted(() => {
        taskStore.fetchTasks();
    });

    const isModalVisible = ref(false);

    async function createNewTask(task: Omit<Task, "id">) {
        await taskStore.addNewTask(task);
    }

</script>
<template>
    <div :class="styles.container">
        <div :class="styles.panelInfo">
            <h1>My Task</h1>
            <div :class="styles.btns">
                <div>
                    <button :class="[styles.btn, styles.blue, styles.add]"
                    @click="isModalVisible = true">+</button>
                    <BaseModal :visible="isModalVisible" @close="isModalVisible = false">
                           <TaskForm 
                                @create="createNewTask"
                                :id="taskStore.lastID"
                            />
                    </BaseModal>
                </div>
            </div>
        </div>
        <div :class="styles.tasks">
            <div :class="styles.toDoList">
                <h3>To Do</h3>
                <div :class="styles.line"></div>
                <div>
                    <TaskList 
                        :tasks="taskStore.pendingTasks"
                    />
                </div>
            </div>

            <div :class="styles.DoneList">
                <h3>Done</h3>
                <div :class="styles.line"></div>
                <div>
                    <TaskList 
                        :tasks="taskStore.completedTasks"
                    />
                </div>
            </div>
            
        </div>
    </div>
    
</template>