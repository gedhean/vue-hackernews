import Vue from "vue";
import App from "./App";
import ProgressBar from "./components/ProgressBar.vue";
import { fetchListData } from "./api/api";

Vue.config.productionTip = false;

function attachProgressBar() {
  const pbar = new Vue(ProgressBar).$mount();

  Vue.prototype.$pbar = pbar;

  document.body.appendChild(pbar.$el);
}

function getTopItems() {
  return fetchListData("top").then(items => items);
}

getTopItems().then(items => {
  attachProgressBar();
  window.items = items;
  new Vue({
    el: "#app",
    render: h => h(App)
  });
});
