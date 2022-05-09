<script src="main.js"></script>
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">CRUD User</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

