export const MAX_NEWS_COUNT = 20;
export default {
  displayNews({ news, route }) {
    const currentPage = Number(route && route.params && route.params.page) || 1;
    const startIndex = (currentPage - 1) * MAX_NEWS_COUNT;
    const endIndex = currentPage * MAX_NEWS_COUNT;

    return news.slice(startIndex, endIndex);
  },
  maxPage({ news }) {
    return Math.ceil(news.length / MAX_NEWS_COUNT);
  }
};
