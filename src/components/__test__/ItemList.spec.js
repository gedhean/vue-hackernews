import Item from "./../Item.vue";
import ItemList from "./../../views/ItemList.vue";
import { mount } from "@vue/test-utils";

describe("ItemList.vue", () => {
  test("render all window.items (1) as Item components", () => {
    window.items = [{}];
    const wrapper = mount(ItemList);

    const Items = wrapper.findAll(Item);

    expect(Items).toHaveLength(window.items.length);
  });

  test("render all window.items (2) as Item components", () => {
    window.items = [{}, {}, {}];
    const wrapper = mount(ItemList);

    const Items = wrapper.findAll(Item);

    expect(Items).toHaveLength(window.items.length);
  });

  test("Item children receive right prop.item", () => {
    window.items = [{ id: 1 }, { id: 2 }];
    const wrapper = mount(ItemList);

    const Items = wrapper.findAll(Item);

    Items.wrappers.forEach((item, idx) => {
      expect(item.props().item).toBe(window.items[idx]);
    });
  });
});
