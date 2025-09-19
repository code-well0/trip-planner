import { arrayToMap, mapToArray } from './planModel';

test('arrayToMap and mapToArray roundtrip', () => {
  const arr = [
    { id: 'a', name: 'A' },
    { id: 'b', name: 'B' },
  ];
  const map = arrayToMap(arr);
  expect(map.a.name).toBe('A');
  expect(map.b.name).toBe('B');
  const out = mapToArray(map);
  expect(Array.isArray(out)).toBe(true);
  expect(out.length).toBe(2);
});
