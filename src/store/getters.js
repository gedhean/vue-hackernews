export const MAX_NEWS_COUNT = 20;
export default {
  displayNews({ news }) {
    return news.slice(0, MAX_NEWS_COUNT);
  },
  maxPage({ news }) {
    return Math.ceil(news.length / MAX_NEWS_COUNT);
  }
};
