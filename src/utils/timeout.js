export function timeout(delay, loading) {
  return new Promise((res) => setTimeout((res) => (res = false), delay));
}
