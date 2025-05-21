<template>
  <div class="user-list-view">
    <h1>User List</h1>
    <LoadingSpinner v-if="userStore.isLoadingList" />
    <ErrorMessage v-if="userStore.errorList" :message="userStore.errorList" />
    <div v-if="!userStore.isLoadingList && !userStore.errorList && userStore.users.length" class="user-grid">
      <UserCard v-for="user in userStore.users" :key="user.id" :user="user" />
    </div>
    <p v-if="!userStore.isLoadingList && !userStore.errorList && !userStore.users.length">
      No users found.
    </p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/userStore';
import UserCard from '@/components/UserCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUsers();
});
</script>

<style scoped>
.user-list-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.user-list-view h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>