import flushPromises from "flush-promises";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Item from "./../Item.vue";
import ItemList from "./../../views/ItemList.vue";

jest.mock("../../api/api.js");

const localVue = createLocalVue();
localVue.use(Vuex);

const defaultStoreConfig = {
  getters: { displayNews: jest.fn() },
  actions: { fetchListData: jest.fn(() => Promise.resolve([])) }
};

function createStore(overrides) {
  return new Vuex.Store({ ...defaultStoreConfig, ...overrides });
}

function createWrapper(overrides) {
  const defaultMountOptions = {
    mocks: {
      $bar: {
        start: jest.fn(),
        fail: jest.fn(),
        finish: jest.fn()
      }
    },
    localVue,
    store: createStore(),
    ...overrides
  };

  return shallowMount(ItemList, defaultMountOptions);
}

describe("ItemList.vue", () => {
  test("render an Item components for each item", async () => {
    expect.assertions(4);
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    defaultStoreConfig.getters.displayNews.mockReturnValue(items);

    const wrapper = createWrapper();
    await flushPromises();

    const Items = wrapper.findAll(Item);

    expect(Items).toHaveLength(items.length);

    Items.wrappers.forEach((wrapper, idx) => {
      expect(wrapper.vm.item).toBe(items[idx]);
    });
  });

  test("Item children receive right prop.item", () => {
    const wrapper = createWrapper();

    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    defaultStoreConfig.getters.displayNews.mockReturnValue(items);

    const Items = wrapper.findAll(Item);

    Items.wrappers.forEach((item, idx) => {
      expect(item.props().item).toBe(
        wrapper.vm.$store.getters.displayNews[idx]
      );
    });
  });

  // TODO: figure out why mount is calling beforeMount hook twice
  test("calls $bar.start on load", () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.$bar.start).toHaveBeenCalled();
  });

  test("calls $bar.finish when load data successful", async () => {
    expect.assertions(1);
    const wrapper = createWrapper();

    await flushPromises();

    expect(wrapper.vm.$bar.finish).toHaveBeenCalled();
  });

  test("calls $bar.fail when load data unsuccessful", async () => {
    expect.assertions(1);
    // Ensue the fetch fails
    defaultStoreConfig.actions.fetchListData.mockRejectedValueOnce();
    const wrapper = createWrapper();

    await flushPromises();

    expect(wrapper.vm.$bar.fail).toHaveBeenCalled();
  });

  test('dispatch fetchListData with "top"', async () => {
    expect.assertions(1);
    const store = createStore();

    store.dispatch = jest.fn(() => Promise.resolve());

    createWrapper({ store });

    await flushPromises();

    expect(store.dispatch).toHaveBeenCalledWith("fetchListData", {
      type: "top"
    });
  });
});
