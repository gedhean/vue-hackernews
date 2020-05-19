<template>
  <ul class="items-list">
    <p v-if="$store.getters.maxPage" class="pages">
      {{ currentPage }}/{{ $store.getters.maxPage }}
    </p>
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
  computed: {
    currentPage() {
      return this.$route.params.page || 1;
    }
  },
  methods: {
    loadItems() {
      this.$bar.start();
      this.$store
        .dispatch("fetchListData", { type: this.$route.params.type })
        .then(() => {
          if (this.$route.params.page > this.$store.getters.maxPage) {
            this.$router.replace("/top/1");
          }
        })
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

  .pages {
    font-size: 16px;
    font-weight: normal;
    text-align: right;
  }
}
</style>
