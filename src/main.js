import Vue from "vue";
import App from "./App";
import ProgressBar from "./components/ProgressBar.vue";
import store from "./store";

Vue.config.productionTip = false;

function attachProgressBar() {
  const pbar = new Vue(ProgressBar).$mount();

  Vue.prototype.$bar = pbar;

  document.body.appendChild(pbar.$el);
}

attachProgressBar();

new Vue({
  store,
  el: "#app",
  render: h => h(App)
});
