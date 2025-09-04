<script setup lang="ts">
    import type { Task } from '@/interfaces/Task';
    import { reactive, ref } from 'vue';
    import style from "./TaskForm.module.css";

    const props = defineProps(['id']);
    const emits = defineEmits(['create']);

    const data = reactive({
        title: "",
        description: "",
        difficulty: 'low',
        xp: 0
    });

    function submitTask(){
        emits('create', {id: props.id, ...data});

        data.title = '';
        data.description = '';
        data.difficulty = 'low';
        data.xp = 0;
    }
</script>
<template>
    <div :class="style.form">
        <h3>Новая задача</h3>
        <div :class="style.fields">
            <div>Название:</div>
            <div><input type="text" name="title" v-model.lazy="data.title"/></div>
            <div>Описание:</div>
            <textarea name="description" v-model.lazy="data.description"></textarea>
            <div>
                Сложность: 
            </div>
            <select name="difficulty" v-model="data.difficulty">
                <option>low</option>
                <option>medium</option>
                <option>high</option>
            </select>
            <div>Очки опыта: </div>
            <input type="number" name="xp" v-model="data.xp">
        </div>
        <button :class="style.btn" @click="submitTask">Добавить</button>
    </div>
</template>