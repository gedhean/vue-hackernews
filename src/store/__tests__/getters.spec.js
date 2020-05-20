import getters from "../getters";

describe("Store getters", () => {
  test("displayNews return the first 20 news", () => {
    const news = Array(21).map((_, i) => i);
    const state = { news };

    const displayNews = getters.displayNews(state);

    expect(displayNews).toHaveLength(20);
    expect(displayNews).toEqual(news.slice(0, 20));
  });

  test("maxPage return a rounde number based on total news", () => {
    const news = Array(45)
      .fill()
      .map((_, i) => i);

    const maxPage = getters.maxPage({ news });

    expect(maxPage).toBe(3);
  });

  test("displayNews returns 20-40 news if page is 2", () => {
    const news = Array(40)
      .fill()
      .map((_, i) => i);
    const result = getters.displayNews({
      news,
      route: { params: { page: 2 } }
    });

    expect(result).toEqual(news.slice(20, 40));
  });
});
