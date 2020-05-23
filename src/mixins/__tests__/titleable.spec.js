import { shallowMount } from "@vue/test-utils";
import titleable from "../titleable";

describe("titleable.js mixin", () => {
  test("set document.title using component title property", () => {
    // minimal component to test the mixin
    const Component = {
      mixins: [titleable],
      render() {},
      data: () => ({ title: "Home" })
    };

    shallowMount(Component);

    expect(document.title).toBe("HN | Home");
  });

  test("does not set document.title porperty title not exists", () => {
    const Component = {
      mixins: [titleable],
      render() {},
      data: () => ({})
    };

    document.title = "A Title";
    shallowMount(Component);

    expect(document.title).toBe("A Title");
  });

  test("set document.title using the return value of title if it is a function", () => {
    const Component = {
      mixins: [titleable],
      render() {},
      data: () => ({ myTitle: "jedi" }),
      methods: {
        title() {
          return this.myTitle;
        }
      }
    };

    shallowMount(Component);

    expect(document.title).toBe("HN | jedi");
  });
});
