<template>
  <div id="app" class="container">
    <progress-bar progress="50" />
    <item-list />
  </div>
</template>

<script>
import ItemList from "./views/ItemList.vue";
import ProgressBar from "./components/ProgressBar.vue";

export default {
  components: {
    ItemList,
    ProgressBar
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  color: #9e9e9e;
  background-color: #282d33;
  line-height: 1.5;
}

.container {
  display: block;
  margin: 0 auto;
  max-width: 900px;
  padding: 0 8px;
}
</style>
