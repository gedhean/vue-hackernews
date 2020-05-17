import ItemList from "../views/ItemList.vue";

const routes = [
  { path: "/:type(top|new|show|ask|job)/:page?", component: ItemList },
  { path: "/", redirect: "/top" }
];

export default routes;
