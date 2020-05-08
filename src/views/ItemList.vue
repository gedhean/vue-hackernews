<template>
  <ul class="items-list">
    <item v-for="item in items" :key="item.id" :item="item" />
  </ul>
</template>
<script>
import Item from "./../components/Item.vue";
import { fetchListData } from "../api/api";

export default {
  components: {
    Item
  },
  beforeMount() {
    this.loadItems();
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    loadItems() {
      this.$bar?.start();

      return fetchListData("top")
        .then(items => (this.items = items))
        .then(() => this.$bar?.finish())
        .catch(() => this.$bar?.fail());
    }
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
