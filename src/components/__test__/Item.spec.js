import Item from "./../Item.vue";
import { shallowMount } from "@vue/test-utils";

const item = {
  title: "news-title",
  author: "jedi",
  url: "http://www.example.com/news",
  score: 10
};

describe("Item.vue", () => {
  test("render prop item.title", () => {
    const wrapper = shallowMount(Item, { propsData: { item } });

    expect(wrapper.text()).toContain(item.title);
  });

  test("render prop item.author", () => {
    const wrapper = shallowMount(Item, { propsData: { item } });

    expect(wrapper.text()).toContain(item.author);
  });

  test("render prop item.score", () => {
    const wrapper = shallowMount(Item, { propsData: { item } });

    expect(wrapper.text()).toContain(item.score);
  });

  test("render a link to prop item.url with text item.title", () => {
    const wrapper = shallowMount(Item, { propsData: { item } });

    const link = wrapper.find("a.title");

    expect(link.text()).toContain(item.title);
    expect(link.attributes().href).toBe(item.url);
  });
});
