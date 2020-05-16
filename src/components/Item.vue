<template>
  <li>
    <a class="title" :href="item.url" target="_blank">
      {{ item.title }}
    </a>
    <p>{{ item.author }}</p>
    <p>{{ item.score }}</p>
  </li>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>
