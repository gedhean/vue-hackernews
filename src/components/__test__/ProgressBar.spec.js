import ProgressBar from "./../ProgressBar.vue";
import { shallowMount } from "@vue/test-utils";

beforeEach(() => {
  jest.useFakeTimers();
});

describe("ProgressBar.vue", () => {
  test("should be hidden by default", () => {
    const wrapper = shallowMount(ProgressBar);

    expect(wrapper.element.style.display).toBe("none");
  });

  test("display when start method is called", async done => {
    const wrapper = shallowMount(ProgressBar);

    wrapper.vm.start();

    await wrapper.vm.$nextTick();

    expect(wrapper.element.style.display).toBe("block");
    done();
  });

  test("width should starts at 0%", () => {
    const wrapper = shallowMount(ProgressBar);

    expect(wrapper.element.style.width).toBe("0%");
  });

  test("set width to 100% when the finish method is called", async () => {
    const wrapper = shallowMount(ProgressBar);

    wrapper.vm.start();
    wrapper.vm.finish();

    await wrapper.vm.$nextTick();

    expect(wrapper.element.style.width).toBe("100%");
  });

  test("hide the bar when finish is called", async () => {
    const wrapper = shallowMount(ProgressBar);

    wrapper.vm.start();
    wrapper.vm.finish();

    await wrapper.vm.$nextTick();

    expect(wrapper.element.style.display).toBe("none");
  });

  test("start method sould reset width to 0%", async () => {
    const wrapper = shallowMount(ProgressBar);

    wrapper.vm.finish();
    wrapper.vm.start();

    await wrapper.vm.$nextTick();

    expect(wrapper.element.style.width).toBe("0%");
  });

  test("increase by 1% every 100ms after start is called", async () => {
    const INTERVAL_MS = 100;
    const wrapper = shallowMount(ProgressBar);

    wrapper.vm.start();
    await wrapper.vm.$nextTick();

    await jest.advanceTimersByTime(INTERVAL_MS);
    expect(wrapper.element.style.width).toBe("1%");

    await jest.advanceTimersByTime(99 * INTERVAL_MS);
    expect(wrapper.element.style.width).toBe("100%");
  });

  test("clear interval when finish is called", async () => {
    const wrapper = shallowMount(ProgressBar);
    const clearIntervalSpy = jest.spyOn(window, "clearInterval");

    wrapper.vm.start();
    const { timerId } = wrapper.vm;
    wrapper.vm.finish();
    await wrapper.vm.$nextTick();

    expect(clearIntervalSpy).toHaveBeenCalledWith(timerId);
  });

  test("add error class when fail method is called", async () => {
    expect.assertions(1);
    const wrapper = shallowMount(ProgressBar);

    wrapper.vm.start();
    wrapper.vm.fail();

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain("error");
  });

  test("call fail set width to 100%", async () => {
    expect.assertions(1);
    const wrapper = shallowMount(ProgressBar);

    wrapper.vm.start();
    wrapper.vm.fail();

    await wrapper.vm.$nextTick();

    expect(wrapper.element.style.width).toBe("100%");
  });

  test("display error msg when fail is called", async () => {
    expect.assertions(2);
    const wrapper = shallowMount(ProgressBar);

    // Ensure msg is empty before fail
    expect(wrapper.text()).toContain("");

    wrapper.vm.start();
    wrapper.vm.fail();

    await wrapper.vm.$nextTick();

    // Assert show msg after fail
    expect(wrapper.text()).toContain("Failed to fetch Hacker News data");
  });
});
