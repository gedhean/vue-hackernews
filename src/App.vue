<template>
  <div id="app" class="container">
    <header class="header">
      <nav class="nav">
        <router-link to="/top">top</router-link>
        <router-link to="/new">new</router-link>
        <router-link to="/show">show</router-link>
        <router-link to="/ask">ask</router-link>
        <router-link to="/job">job</router-link>
      </nav>
    </header>
    <main>
      <router-view :key="$route.params.type"></router-view>
    </main>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

a {
  color: #6ba554;
}

body {
  color: #9f9b9b;
  background-color: #282d33;
  line-height: 1.5;
}

.container {
  display: block;
  margin: 0 auto;
  max-width: 900px;
  padding: 0 8px;
}

.header {
  margin: 16px 0px;
}

.nav {
  display: flex;
  justify-content: flex-end;

  a {
    margin-left: 8px;
  }
}

a.disabled {
  cursor: not-allowed;
  color: #484848;
}
</style>
