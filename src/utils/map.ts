export function mapSafeGetter<T>(map: Map<string, T[]>, key: string) {
  return map.get(key) || [];
}
