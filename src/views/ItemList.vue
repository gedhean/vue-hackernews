<template>
  <ul class="items-list">
    <item
      v-for="news in $store.getters.displayNews"
      :key="news.id"
      :item="news"
    />
  </ul>
</template>
<script>
import Item from "./../components/Item.vue";

export default {
  components: {
    Item
  },
  beforeMount() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      this.$bar.start();
      this.$store
        .dispatch("fetchListData", { type: "top" })
        .then(() => this.$bar.finish())
        .catch(() => this.$bar.fail());
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
