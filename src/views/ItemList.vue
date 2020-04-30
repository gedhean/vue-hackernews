<template>
  <ul class="items-list">
    <item v-for="item in items" :key="item.id" :item="item" />
  </ul>
</template>
<script>
import Item from "./../components/Item.vue";
export default {
  components: {
    Item
  },
  data() {
    return {
      items: window.items
    };
  }
};
</script>

<style lang="scss">
.items-list {
  list-style: none;
  font-size: 28px;

  li {
    margin-bottom: 32px;
    a {
      color: #6ba554;
      font-weight: bold;
    }
  }
}
</style>
