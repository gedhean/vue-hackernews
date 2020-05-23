export default {
  mounted() {
    const title = getTitle(this);

    if (title) document.title = "HN | " + title;

    function getTitle(vm) {
      return typeof vm.title === "function" ? vm.title.call(vm) : vm.title;
    }
  }
};
