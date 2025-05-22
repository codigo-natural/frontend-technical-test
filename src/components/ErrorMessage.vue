<template>
  <div v-if="message" class="error-message">
    <p><strong>Error:</strong> {{ message }}</p>
  </div>
</template>

<script setup>

// eslint-disable-next-line
defineProps({
  message: {
    type: String,
    default: null,
  },
});
</script>

<style scoped>
.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 4px;
  margin: 10px 0;
  border: 1px solid #ef9a9a;
}
</style>