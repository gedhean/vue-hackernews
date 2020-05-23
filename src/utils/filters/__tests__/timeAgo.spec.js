import timeago from "../timeAgo";

Date.now = () => new Date("2020");
const unixNow = Date.now() / 1000;

// helpers
const seconds = secs => secs * 1;
const minutes = min => min * seconds(60);
const hours = h => h * minutes(60);
const days = d => d * hours(24);

describe("timeago filter", () => {
  test("returns 1 second", () => {
    expect(timeago(unixNow - seconds(1))).toBe("1 second");
  });

  test("returns 3 second", () => {
    expect(timeago(unixNow - seconds(3))).toBe("3 seconds");
  });

  test("returns 1 minute", () => {
    expect(timeago(unixNow - minutes(1))).toBe("1 minute");
  });

  test("returns 2 minute", () => {
    expect(timeago(unixNow - minutes(2))).toBe("2 minutes");
  });

  test("returns 59 minute", () => {
    expect(timeago(unixNow - (minutes(59) + seconds(2)))).toBe("59 minutes");
  });

  test("returns 1 hour", () => {
    expect(timeago(unixNow - hours(1))).toBe("1 hour");
  });

  test("returns 23 hours", () => {
    expect(timeago(unixNow - (hours(23) + minutes(30)))).toBe("23 hours");
  });

  test("returns 1 day", () => {
    expect(timeago(unixNow - days(1))).toBe("1 day");
  });

  test("returns 20 day", () => {
    expect(timeago(unixNow - (days(20) + hours(2)))).toBe("20 days");
  });
});
