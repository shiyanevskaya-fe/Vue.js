<script setup lang="ts">
    import { ref, computed, defineProps, watch } from 'vue';
    import type { Task } from '../interfaces/Task';
    import style from './TaskItem.module.css';

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
</script>

<template>
    <div :class="style.taskItem">
        <h4 class="title"> {{props.task.title}} </h4>
        <div :class="style.info">
            <div class="description"> {{props.task.description}} </div>
            <div :class="style.tags">
                <span :class="difficultyClass"> {{props.task.difficulty}} </span>
                <div :class="style.completed">
                    <input type="checkbox" :checked="props.task.completed" :id="CheckboxID" v-model="props.task.completed">
                    <label :for="CheckboxID"> {{labelCompleted}} </label>
                </div>
                <div :class="style.xp">
                    <div :class="style.xpIcon">xp</div>
                    <div> {{props.task.xp}} </div> 
                </div>
            </div>
        </div>
    </div>
</template>