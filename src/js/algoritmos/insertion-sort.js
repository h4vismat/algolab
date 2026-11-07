export function* insertionSort(input) {
  const a = [...input];

  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;

    const reference = { value: key };

    while (j >= 0) {
      yield { type: 'compare', indices: [j], values: [a[j], key], reference };

      if (a[j] <= key) break;

      a[j + 1] = a[j];

      yield { type: 'overwrite', index: j + 1, value: a[j], reference };
      j--;
    }

    a[j + 1] = key;
    yield { type: 'overwrite', index: j + 1, value: key, reference };
  }

  yield { type: 'markSorted', indices: a.map((_, i) => i), final: true };
  return a;
}
