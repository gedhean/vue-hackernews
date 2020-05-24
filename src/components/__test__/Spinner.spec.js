import { shallowMount } from "@vue/test-utils";
import Spinner from "../../components/Spinner.vue";

describe("Spinner.vue", () => {
  test("renders correctly", () => {
    const wrapper = shallowMount(Spinner);

    expect(wrapper).toMatchSnapshot();
  });
});
