<template>
  <div :class="['progress-bar', { error: error }]" :style="style">
    {{ error ? "Failed to fetch Hacker News data" : "" }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
      hidden: true,
      error: false
    };
  },
  computed: {
    style() {
      return {
        width: this.percent + "%",
        display: this.hidden ? "none" : "block"
      };
    }
  },
  methods: {
    start() {
      this.percent = 0;
      this.hidden = false;

      this.timerId = setInterval(() => {
        this.percent++;
      }, 100);
    },
    finish() {
      this.percent = 100;
      this.hidden = true;

      clearInterval(this.timerId);
    },
    fail() {
      this.error = true;
      this.percent = 100;
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
  overflow: hidden;
  max-width: 100%;
}

.error {
  color: #000;
  text-align: center;
  background-color: rgb(240, 52, 52);
}
</style>
