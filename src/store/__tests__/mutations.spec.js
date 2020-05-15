import mutations from "../mutations";

describe("Store matations", () => {
  test("SET_NEWS should assign payload.news to state.news", () => {
    const state = { news: [] };
    const payload = { news: ["n1", "n2"] };

    mutations.SET_NEWS(state, payload);

    expect(state.news).toBe(payload.news);
  });
});
