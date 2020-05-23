<template>
  <li>
    <a class="title" :href="item.url" target="_blank">
      {{ item.title }}
    </a>
    <p class="news-meta">
      <!-- <span class="type">{{ item.type }}</span> -->
      by
      <span class="author"> {{ item.by }}</span>
      <span class="time" v-if="item.time"> {{ item.time | timeAgo }} ago</span>
      <span class="domain"> ({{ item.url | host }})</span>
      - score
      <span class="score">{{ item.score || 0 }}</span>
    </p>
  </li>
</template>

<script>
import timeAgo from "../utils/filters/timeAgo";
import host from "../utils/filters/host";
export default {
  props: {
    item: Object
  },
  filters: {
    timeAgo,
    host
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
    font-weight: 100;
  }

  .time {
    font-style: italic;
  }

  .score {
    font-weight: bold;
  }
}
</style>
