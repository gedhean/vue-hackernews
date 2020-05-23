import Item from "./../Item.vue";
import { shallowMount } from "@vue/test-utils";

const item = {
  title: "news-title",
  by: "jedi",
  url: "http://www.example.com/news",
  score: 10
};

describe("Item.vue", () => {
  test("render prop item.title", () => {
    const wrapper = shallowMount(Item, { propsData: { item } });

    expect(wrapper.text()).toContain(item.title);
  });

  test("render prop item.by", () => {
    const wrapper = shallowMount(Item, { propsData: { item } });

    expect(wrapper.text()).toContain(item.by);
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

  test("render time since item was posted", () => {
    const dateNow = jest.spyOn(Date, "now");
    const dateNowTime = new Date("2020");
    dateNow.mockImplementation(() => dateNowTime);

    const TEN_MINUTES_IN_SECONDS = 10 * 60;
    const time = Date.now() / 1000 - TEN_MINUTES_IN_SECONDS;
    const item = { time };
    const wrapper = shallowMount(Item, { propsData: { item } });

    expect(wrapper.text()).toContain("10 minutes ago");
    dateNow.mockRestore();
  });

  test("render news domain", () => {
    const wrapper = shallowMount(Item, {
      propsData: { item: { url: "http://www.example.com/news" } }
    });

    expect(wrapper.text()).toContain("example.com");
  });
});
