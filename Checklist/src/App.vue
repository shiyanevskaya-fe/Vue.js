<script setup lang="ts">
import styles from "./App.module.css";

import Task from "./components/Task.vue";
import FormCreateTask from "./components/FormCreateTask.vue";
import {addNewTask, toggleTaskStatus, getActiveTasks} from "./composables/task";
import type {Task as InterfaceTask, NewTask as InterfaceNewTask} from "./composables/task";
import { reactive, computed } from "vue";

const tasks = reactive< InterfaceTask []>([]);

function createTask(newTask : InterfaceNewTask) : void {
  addNewTask(tasks, newTask);
};

function editStatus(id : number) : void {
  let task = tasks.find(task => task.id === id);

  if(task){
    toggleTaskStatus(task);
  } else {
    throw new Error("task with id = " + id + " not found");
  }
};

const activeTask = computed(() => getActiveTasks(tasks));
</script>

<template>
  <section :id="styles.checklist">
    <div>
      <h2>Задачи:</h2>
      <div :class="styles.tasks">
          <Task
            v-for="task in activeTask" 
            :key="task.id"
            :id="task.id" 
            :title="task.title" 
            :description="task.description" 
            @change="editStatus"/>
      </div>
    </div>

    <FormCreateTask @create="createTask" />
  </section>
</template>
