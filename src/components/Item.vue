<template>
  <li>
    {{ item.author }}
    <a class="title" :href="item.url" target="_blank">
      {{ item.title }}
    </a>
  </li>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>
