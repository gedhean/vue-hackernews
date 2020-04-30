import ProgressBar from "./../ProgressBar.vue";
import { shallowMount } from "@vue/test-utils";

describe("ProgressBar.vue", () => {
  test("should be hidden by default", () => {
    const wrapper = shallowMount(ProgressBar);

    expect(wrapper.text()).toBe("");
  });

  test("props.progress should starts at 0%", () => {
    const wrapper = shallowMount(ProgressBar);

    expect(wrapper.element.style.width).toBe("0%");
  });

  test("as props.progress increase, bar width grows", () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: {
        progress: 5
      }
    });

    expect(wrapper.element.style.width).toBe("5%");
  });
});
