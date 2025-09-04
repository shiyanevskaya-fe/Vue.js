<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps(['visible']);
const emits = defineEmits(['close']);

function handleOverlayClick () {
    emits('close');
}
</script>
<template>
    <div v-if="visible" class="modal-overlay" @click.self="handleOverlayClick">
        <div class="modal-content">
        <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 4px;
  min-width: 300px;
}
.modal-close {
  margin-top: 1rem;
}
</style>