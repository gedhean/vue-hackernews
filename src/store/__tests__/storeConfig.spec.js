import { createLocalVue } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vuex from "vuex";
import deepClone from "lodash.clonedeep";
import { fetchListData } from "../../api/api";
import storeConfig from "../storeConfig";
import { MAX_NEWS_COUNT } from "../getters";

jest.mock("../../api/api");

const localVue = createLocalVue();
localVue.use(Vuex);

function createNews() {
  return Array(21)
    .fill()
    .map((_, i) => ({
      item: `item ${i + 1}`
    }));
}

describe("Store config", () => {
  let store;
  beforeAll(() => {
    store = new Vuex.Store(deepClone(storeConfig));
  });

  test("displayNews getter should update with fetchListData actions result", async () => {
    expect.assertions(1);
    const news = createNews();

    fetchListData.mockResolvedValueOnce(news);
    store.dispatch("fetchListData", { tpye: "top" });
    await flushPromises();

    expect(store.getters.displayNews).toStrictEqual(
      news.slice(0, MAX_NEWS_COUNT)
    );
  });
});
