import type { Move } from './types';

export function getMergeSort(array: number[]) {
  const moves: Move[] = [];
  const tempArray = Array.from(array); // Create a copy to avoid modifying the original array
  mergeSort(tempArray, 0, tempArray.length - 1, moves);

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
  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = array[left + i];
  }

  for (let j = 0; j < n2; j++) {
    R[j] = array[mid + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      array[k] = L[i];
      moves.push({ indices: [k, left + i], type: 'swap' });
      i++;
    } else {
      array[k] = R[j];
      moves.push({ indices: [k, mid + 1 + j], type: 'swap' });
      j++;
    }
    k++;
  }

  while (i < n1) {
    array[k] = L[i];
    moves.push({ indices: [k, left + i], type: 'swap' });
    k++;
    i++;
  }

  while (j < n2) {
    array[k] = R[j];
    moves.push({ indices: [k, mid + 1 + j], type: 'swap' });
    k++;
    j++;
  }
}

export function getQuickSort(array: number[]) {
  const moves: Move[] = [];
  const tempArray = Array.from(array);

  quickSort(tempArray, 0, tempArray.length - 1, moves);
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
  const tempArray = Array.from(array);

  let swapped = false;
  do {
    swapped = false;
    for (let i = 0; i < tempArray.length - 1; i++) {
      // comparison animation
      // moves.push({ indices: [i, i + 1], type: 'comp' });

      if (tempArray[i] > tempArray[i + 1]) {
        swapped = true;
        moves.push({ indices: [i, i + 1], type: 'swap' });
        [tempArray[i], tempArray[i + 1]] = [tempArray[i + 1], tempArray[i]];
      }
    }
  } while (swapped);
  return moves;
}

export function heapSort(array: number[]) {}
