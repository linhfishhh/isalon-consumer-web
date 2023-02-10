export function placeholder(data, count) {
  if (data.length === 0) {
    return [...Array(count)];
  }
  return data;
}
