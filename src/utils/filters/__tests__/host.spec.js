import host from "../host";

describe("host filter", () => {
  test("returns empty string if url is undefined", () => {
    expect(host(undefined)).toBe("");
  });

  test("remore http from url", () => {
    const url = "http://google.com";

    expect(host(url)).toBe("google.com");
  });

  test("remore httpS from url", () => {
    const url = "https://google.com";

    expect(host(url)).toBe("google.com");
  });

  test("remove path from url", () => {
    const url = "https://google.com/search?foo=ahh";

    expect(host(url)).toBe("google.com");
  });

  test("remove www from url", () => {
    const url = "https://www.google.com/search?foo=ahh";

    expect(host(url)).toBe("google.com");
  });

  test("keeps subdomain", () => {
    const url = "https://blog.google.com/search?foo=ahh";

    expect(host(url)).toBe("blog.google.com");
  });
});
