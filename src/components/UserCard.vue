<template>
  <div class="user-card">
    <div class="user-avatar">
      <span>{{ userInitials }}</span>
    </div>
    <div class="user-info">
      <h3>{{ user.name }}</h3>
      <p class="username">@{{ user.username }}</p>
      <p class="email">
        <font-awesome-icon :icon="['far', 'envelope']" />
        {{ user.email }}
      </p>
      <router-link :to="{ name: 'userDetail', params: { id: user.id } }" class="details-link">
        <span>View Details</span>
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const userInitials = computed(() => {
  const nameParts = props.user.name.split(' ');
  return nameParts.length > 1 
    ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
    : nameParts[0][0].toUpperCase();
});
</script>

<style scoped>
.user-card {
  border: none;
  padding: 24px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  flex-shrink: 0;
}

.user-info {
  flex-grow: 1;
}

.user-info h3 {
  margin: 0 0 6px 0;
  color: #1e293b;
  font-size: 1.25rem;
}

.username {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 12px 0;
}

.email {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 20px 0;
  color: #334155;
}

.details-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #eff6ff;
  color: #2563eb;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
}

.details-link:hover {
  background-color: #dbeafe;
  text-decoration: none;
}
</style>