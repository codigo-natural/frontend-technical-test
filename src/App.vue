<template>
  <header class="app-header">
    <h1>Vue User Directory</h1>
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped> 
.app-header {
    background-color: #fff;
    padding: 15px 30px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    border-bottom: 3px solid #007bff;
}
.app-header h1 {
    margin: 0;
    color: #007bff;
    font-size: 1.8em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>