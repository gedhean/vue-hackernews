<template>
  <div class="progress-bar" :style="styles"></div>
</template>

<script>
export default {
  props: {
    progress: {
      default: 0
    }
  },
  computed: {
    styles() {
      return { width: this.progress + "%" };
    }
  }
};
</script>
<style lang="scss" scoped>
.progress-bar {
  height: 5px;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: orange;
  z-index: 2;
}
</style>
