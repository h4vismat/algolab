import { bubbleSort } from "./bubble-sort";
import { insertionSort } from "./insertion-sort";

export const algoritmos = {
  bubble: {
    run: bubbleSort,
    name: 'Bubble Sort',
    desc: 'Compara vizinhos e troca os que estão fora de ordem. A cada passagem, o maior valor restante chega ao final do array. Se nenhuma troca acontecer, o algoritmo termina.',
    best: 'O(n)',
    avg: 'O(n^2)'
  },
  insertion: {
    run: insertionSort,
    name: 'Insertion Sort',
    desc: 'Guarda o próximo valor como chave. Desloca para a direita os valores maiores e insere a chave no espaço aberto.',
    best: 'O(n)',
    avg: 'O(n^2)'
  }
}
