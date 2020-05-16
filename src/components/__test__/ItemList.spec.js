import flushPromises from "flush-promises";
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Item from "./../Item.vue";
import ItemList from "./../../views/ItemList.vue";

jest.mock("../../api/api.js");

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ItemList.vue", () => {
  let store, storeConfig, $bar;
  beforeEach(() => {
    storeConfig = {
      getters: { displayNews: jest.fn() },
      actions: { fetchListData: jest.fn(() => Promise.resolve([])) }
    };
    store = new Vuex.Store(storeConfig);

    $bar = {
      start: jest.fn(),
      fail: jest.fn(),
      finish: jest.fn()
    };
  });

  test("render an Item components for each item", async () => {
    expect.assertions(4);
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    storeConfig.getters.displayNews.mockReturnValue(items);

    const wrapper = mount(ItemList, { mocks: { $bar }, localVue, store });
    await flushPromises();

    const Items = wrapper.findAll(Item);

    expect(Items).toHaveLength(items.length);

    Items.wrappers.forEach((wrapper, idx) => {
      expect(wrapper.vm.item).toBe(items[idx]);
    });
  });

  test("Item children receive right prop.item", () => {
    const wrapper = mount(ItemList, { mocks: { $bar }, localVue, store });

    const Items = wrapper.findAll(Item);

    Items.wrappers.forEach((item, idx) => {
      expect(item.props().item).toBe(window.items[idx]);
    });
  });

  // TODO: figure out why mount is calling beforeMount hook twice
  test("calls $bar.start on load", () => {
    mount(ItemList, { mocks: { $bar }, localVue, store });

    expect($bar.start).toHaveBeenCalled();
  });

  test("calls $bar.finish when load data successful", async () => {
    expect.assertions(1);

    shallowMount(ItemList, { mocks: { $bar }, localVue, store });

    await flushPromises();

    expect($bar.finish).toHaveBeenCalled();
  });

  test("calls $bar.fail when load data unsuccessful", async () => {
    expect.assertions(1);
    // Ensue the fetch fails
    storeConfig.actions.fetchListData.mockRejectedValueOnce();

    shallowMount(ItemList, { mocks: { $bar }, localVue, store });

    await flushPromises();

    expect($bar.fail).toHaveBeenCalled();
  });

  test('dispatch fetchListData with "top"', async () => {
    expect.assertions(1);

    store.dispatch = jest.fn(() => Promise.resolve());
    shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    await flushPromises();

    expect(store.dispatch).toHaveBeenCalledWith("fetchListData", {
      type: "top"
    });
  });
});
