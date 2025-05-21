<template>
  <div class="not-found-view">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go to Homepage</router-link>
  </div>
</template>

<style scoped>
.not-found-view {
  text-align: center;
  padding: 50px;
}
.not-found-view h1 {
  font-size: 3em;
  color: #333;
}
.not-found-view p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px;
}
.not-found-view a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}
.not-found-view a:hover {
  text-decoration: underline;
}
</style>