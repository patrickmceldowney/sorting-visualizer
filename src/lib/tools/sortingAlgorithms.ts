import type { Move } from './types';

export function getMergeSort(array: number[]) {
  const moves: Move[] = [];
  mergeSort(array, 0, array.length - 1, moves);

  return moves;
}

function mergeSort(
  array: number[],
  left: number,
  right: number,
  moves: Move[]
) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(array, left, mid, moves);
    mergeSort(array, mid + 1, right, moves);
    doMerge(array, left, mid, right, moves);
  }
}

function doMerge(
  array: number[],
  left: number,
  mid: number,
  right: number,
  moves: Move[]
) {
  let n1 = mid - left + 1;
  let n2 = right - mid;

  // Create temp arrays
  let L = array.splice(0, mid);
  let R = array.splice(mid);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    // moves.push({ indices: [i, j], type: 'comp' });

    if (L[i] <= R[j]) {
      moves.push({ indices: [k, i], type: 'swap' });
      array[k] = L[i];
      i++;
    } else {
      moves.push({ indices: [k, j], type: 'swap' });
      array[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    // moves.push({ indices: [i, i], type: 'comp' });
    moves.push({ indices: [k, i], type: 'swap' });
    array[k] = L[i];
    k++;
    i++;
  }

  while (j < n2) {
    // moves.push({ indices: [j, j], type: 'comp' });
    moves.push({ indices: [k, j], type: 'swap' });
    array[k] = R[j];
    k++;
    j++;
  }
}

export function getQuickSort(array: number[]) {
  const moves: Move[] = [];

  quickSort(array, 0, array.length - 1, moves);
  return moves;
}
function quickSort(
  mainArray: number[],
  start: number,
  end: number,
  moves: Move[]
) {
  if (start < end) {
    let pivot = randPartition(mainArray, start, end, moves);

    quickSort(mainArray, start, pivot - 1, moves);
    quickSort(mainArray, pivot + 1, end, moves);
  }
}

function partition(array: number[], start: number, end: number, moves: Move[]) {
  let pivot = start;
  // Set i to start - 1 so that it can access the first index in the event that the value at arr[0] is greater than arr[pivot]
  let i = start + 1;

  for (let j = start + 1; j <= end; j++) {
    // moves.push({ indices: [j, pivot], type: 'comp' });
    if (array[j] <= array[pivot]) {
      moves.push({ indices: [i, j], type: 'swap' });
      [array[i], array[j]] = [array[j], array[i]];
      i++;
    }
  }

  // moves.push({ indices: [pivot, i - 1], type: 'comp' });
  moves.push({ indices: [pivot, i - 1], type: 'swap' });
  [array[pivot], array[i - 1]] = [array[i - 1], array[pivot]];
  pivot = i - 1;
  return pivot;
}

function randPartition(
  array: number[],
  start: number,
  end: number,
  moves: Move[]
) {
  let pivot = Math.floor(Math.random() * (end - start + 1)) + start;
  // swap start and pivot element in array

  moves.push({ indices: [start, pivot], type: 'swap' });
  [array[start], array[pivot]] = [array[pivot], array[start]];
  return partition(array, start, end, moves);
}

export function bubbleSort(array: number[]) {
  const moves: Move[] = [];
  let swapped = false;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      // comparison animation
      // moves.push({ indices: [i, i + 1], type: 'comp' });

      if (array[i] > array[i + 1]) {
        swapped = true;
        moves.push({ indices: [i, i + 1], type: 'swap' });
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
      }
    }
  } while (swapped);
  return moves;
}

export function heapSort(array: number[]) {}
