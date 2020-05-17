<template>
  <li>
    <a class="title" :href="item.url" target="_blank">
      {{ item.title }}
    </a>
    <p class="news-meta">
      <span class="type">{{ item.type }}</span>
      by
      <span class="author"> {{ item.by }}</span>
      - with score
      <span class="score">{{ item.score || 0 }}</span>
    </p>
  </li>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>
<style lang="scss" scoped>
.news-meta {
  font-size: 16px;

  .type {
    text-transform: capitalize;
  }

  .author {
    text-transform: lowercase;
    font-style: italic;
  }

  .score {
    font-weight: bold;
  }
}
</style>
