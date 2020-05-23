export default function host(url) {
  if (!url) return "";

  return url
    .replace(/^https?:\/\//, "") // remove protocol
    .replace(/\/.*$/, "") // remove path
    .split(".")
    .filter(sub => sub !== "www") // remove www
    .join(".");
}
