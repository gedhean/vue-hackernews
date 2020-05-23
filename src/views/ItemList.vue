<template>
  <div class="news-list">
    <div class="pages-nav">
      <div class="prev pages-nav__item">
        <router-link v-if="currentPage > 1" :to="prevPagePath"
          >&lt;prev</router-link
        >
        <a v-else class="disabled">&lt;prev</a>
      </div>
      <div class="page__current pages-nav__item">
        <p v-if="$store.getters.maxPage" class="pages">
          {{ currentPage }}/{{ $store.getters.maxPage }}
        </p>
      </div>
      <div class="next pages-nav__item">
        <router-link
          v-if="currentPage < $store.getters.maxPage"
          :to="nextPagePath"
          >next&gt;</router-link
        >
        <a v-else class="disabled">next&gt;</a>
      </div>
    </div>
    <ul class="items-list">
      <item
        v-for="news in $store.getters.displayNews"
        :key="news && news.id"
        :item="news"
      />
    </ul>
  </div>
</template>
<script>
import Item from "./../components/Item.vue";
import titleable from "../mixins/titleable";

export default {
  mixins: [titleable],
  components: {
    Item
  },
  beforeMount() {
    this.loadItems();
  },
  computed: {
    currentPage() {
      const pageParam = Number(this.$route.params.page);

      return Number.isNaN(pageParam) ? 1 : pageParam;
    },
    prevPagePath() {
      return `/${this.$route.params.type}/${this.currentPage - 1}`;
    },
    nextPagePath() {
      return `/${this.$route.params.type}/${this.currentPage + 1}`;
    }
  },
  methods: {
    loadItems() {
      this.$bar.start();
      this.$store
        .dispatch("fetchListData", { type: this.$route.params.type })
        .then(this.validatePageParam)
        .then(() => this.$bar.finish())
        .catch(() => this.$bar.fail());
    },
    validatePageParam() {
      const page = Number(this.$route.params.page);
      if (
        (page > this.$store.getters.maxPage ||
          page < 0 ||
          Number.isNaN(page)) &&
        this.$route.params.page !== undefined // when no page param is present
      ) {
        this.$router.replace("/top/1");
      }
    },
    title() {
      const { type } = this.$route.params;
      return type.charAt(0).toUpperCase() + type.slice(1);
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

.pages-nav {
  display: flex;
  justify-content: flex-end;

  &__item {
    margin-left: 10px;
  }
}
</style>
