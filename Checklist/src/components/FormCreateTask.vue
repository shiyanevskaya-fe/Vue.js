<script setup lang="ts">
import styles from "./FormCreateTask.module.css";
import type {NewTask as InterfaceNewTask} from "../composables/task";
import { defineEmits, reactive } from 'vue';


const emits = defineEmits<(e: 'create', task: InterfaceNewTask)=> void>();

const newTask = reactive<InterfaceNewTask>({
  title: "",
  description: "",
});

function handle() :void {
  if(newTask.title !== "" && newTask.description !== "") {
    emits('create', {...newTask});
    newTask.title = "";
    newTask.description = "";
  }
}
</script>

<template>
<div :class="styles.createTask">
    <h2>Создать новую задачу</h2>
    <div :class="styles.form">
      <input :class="styles.inputFormField" type="text" name="title" id="title" v-model="newTask.title">
      <textarea :class="styles.textareaFormField" v-model="newTask.description"></textarea>
      <button :class="styles.btn" @click="handle">Создать</button>
    </div>
</div>
</template>