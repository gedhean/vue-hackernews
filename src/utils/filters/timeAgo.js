export default function timeAgo(unixTimestamp) {
  const delta = Date.now() / 1000 - Number(unixTimestamp);
  const ONE_MINUTE_IN_SECS = 60;
  const ONE_HOUR_IN_SECS = 60 * ONE_MINUTE_IN_SECS;
  const ONE_DAY_IN_SECS = 24 * ONE_HOUR_IN_SECS;

  if (delta < ONE_MINUTE_IN_SECS) {
    return `${delta} second${delta > 1 ? "s" : ""}`;
  } else if (delta >= ONE_MINUTE_IN_SECS && delta < ONE_HOUR_IN_SECS) {
    const minutes = Math.floor(delta / ONE_MINUTE_IN_SECS);
    const plural = minutes > 1 ? "s" : "";
    return `${minutes} minute${plural}`;
  } else if (delta >= ONE_HOUR_IN_SECS && delta < ONE_DAY_IN_SECS) {
    const hours = Math.floor(delta / ONE_HOUR_IN_SECS);
    const plural = hours > 1 ? "s" : "";
    return `${hours} hour${plural}`;
  } else if (delta >= ONE_DAY_IN_SECS) {
    const days = Math.floor(delta / ONE_DAY_IN_SECS);
    const plural = days > 1 ? "s" : "";
    return `${days} day${plural}`;
  }
}
