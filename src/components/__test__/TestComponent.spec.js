import { shallowMount } from "@vue/test-utils";
import TestComponent from "./../TestComponent.vue";

test('should render "Hello World!"', () => {
  const wrapper = shallowMount(TestComponent);

  expect(wrapper.text()).toContain("Hello World!");
});
