<script setup lang="ts">
    import { ref, computed, defineProps, watch } from 'vue';
    import type { Task } from '../interfaces/Task';
    import style from './TaskItem.module.css';
    import { useTaskStore } from "@/store/tasks";
    import BaseModal from '@/components/BaseModal.vue';

    const taskStore = useTaskStore();

    const props = defineProps<{
        'task': Task
    }>();

    const difficultyClass = computed(() => {
        return [style.difficulty, style[props.task.difficulty]]
    });

    const CheckboxID = computed(() => {
        return "completed" + props.task.id;
    });

    const labelCompleted = ref(textCheckbox(props.task.completed));

    watch(() => props.task.completed, (newVal) => {
        labelCompleted.value = textCheckbox(newVal);
    })

    function textCheckbox(value : boolean) : string{
        return value ? "Выполнена" : "В процессе";
    }

    async function updateTaskStatus(task: Task) {
        console.log("Change task");
        await taskStore.updateTask(task);
    }

    const completed = computed({
        get: () => Boolean(props.task.completed),
        set: (val) => updateTaskStatus({...props.task, completed: val})
    })

    const isModalVisible = ref(false);

    async function deleteTask() {
        await taskStore.deleteTask(props.task.id);
    }

</script>

<template>
    <BaseModal :visible="isModalVisible" @close="isModalVisible = false">
        <div>
            Вы действительно хотите удалить задачу?
            <div>
                <button @click="deleteTask">Да, удалить</button>
                <button @click="isModalVisible = false">Нет</button>
            </div>
        </div>
    </BaseModal>
    <div :class="style.taskItem" @click ="isModalVisible = true">
        <h4 class="title"> {{props.task.title}} </h4>
        <div :class="style.info">
            <div class="description"> {{props.task.description}} </div>
            <div :class="style.tags">
                <span :class="difficultyClass"> {{props.task.difficulty}} </span>
                <div :class="style.completed">
                    <input type="checkbox" :id="CheckboxID" v-model="completed" @click.stop>
                    <label :for="CheckboxID" @click.stop> {{labelCompleted}} </label>
                </div>
                <div :class="style.xp">
                    <div :class="style.xpIcon">xp</div>
                    <div> {{props.task.xp}} </div> 
                </div>
            </div>
        </div>
    </div>
</template>