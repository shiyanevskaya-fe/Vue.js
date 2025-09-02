<script setup lang="ts">
import styles from "./Task.module.css";

import { defineProps, defineEmits } from 'vue';

interface Props {
    id: number,
    title: string,
    description: string,
}

const props = defineProps<Props>();
const emits = defineEmits<(e: 'change', id: number) => void>();


function handle (): void {
    emits('change', props.id);
}
</script>

<template>
    <div :class="styles.task">
        <h2> {{title}} </h2>
        <div> {{description}} </div>
        <div>
            <input type="checkbox" v-on:change="handle" id="done" :class="styles.completedCheckbox">
            <label for="done">Выполнено</label>
        </div>
    </div>
</template>
