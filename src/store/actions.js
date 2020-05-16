import { fetchListData } from "../api/api";

export default {
  fetchListData({ commit }, { type }) {
    return fetchListData(type).then(news => commit("SET_NEWS", { news }));
  }
};
