export function* bubbleSort(input) {
  const a = [...input];

  for (let end = a.length - 1; end > 0; end--) {
    let swapped = false;

    for (let j = 0; j < end; j++) {
      yield { type: 'compare', indices: [j, j + 1], values: [a[j], a[j + 1]] };

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;

        yield { type: 'swap', indices: [j, j + 1] };
      }
    }

    yield { type: 'markSorted', indices: [end] };

    if (!swapped) break;
  }

  yield { type: 'markSorted', indices: a.map((_, i) => i), final: true };
  return a;
}
