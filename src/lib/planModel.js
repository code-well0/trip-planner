// Helpers to convert tours array <-> map keyed by id
export function arrayToMap(arr = []) {
  const map = {};
  arr.forEach((item) => {
    if (item && item.id != null) map[item.id] = item;
  });
  return map;
}

export function mapToArray(map = {}) {
  return Object.keys(map).map((k) => ({ ...map[k] }));
}

export default { arrayToMap, mapToArray };
