import flushPromises from "flush-promises";
import { mount, shallowMount } from "@vue/test-utils";

import Item from "./../Item.vue";
import ItemList from "./../../views/ItemList.vue";
import { fetchListData } from "../../api/api.js";

jest.mock("../../api/api.js");

describe("ItemList.vue", () => {
  test("render an Item components for each item", async () => {
    expect.assertions(4);
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    };
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    fetchListData.mockResolvedValueOnce(items);

    const wrapper = mount(ItemList, { mocks: { $bar } });

    await flushPromises();

    const Items = wrapper.findAll(Item);

    expect(Items).toHaveLength(items.length);

    Items.wrappers.forEach((wrapper, idx) => {
      expect(wrapper.vm.item).toBe(items[idx]);
    });
  });

  test("Item children receive right prop.item", () => {
    window.items = [{ id: 1 }, { id: 2 }];
    const wrapper = mount(ItemList);

    const Items = wrapper.findAll(Item);

    Items.wrappers.forEach((item, idx) => {
      expect(item.props().item).toBe(window.items[idx]);
    });
  });

  // TODO: figure out why mount is calling beforeMount hook twice
  test("calls $bar.start on load", () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    };

    mount(ItemList, { mocks: { $bar } });
    expect($bar.start).toHaveBeenCalled();
  });

  test("calls $bar.finish when load data successful", async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      finish: jest.fn()
    };

    shallowMount(ItemList, { mocks: { $bar } });

    await flushPromises();

    expect($bar.finish).toHaveBeenCalled();
  });

  test("calls $bar.fail when load data unsuccessful", async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      fail: jest.fn()
    };
    // Ensue the fetch fails
    fetchListData.mockRejectedValueOnce();

    shallowMount(ItemList, { mocks: { $bar } });

    await flushPromises();

    expect($bar.fail).toHaveBeenCalled();
  });
});
