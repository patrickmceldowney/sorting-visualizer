export function getMergeSort(array: number[]) {
  const animations: number[][] = [];

  const auxArray = array.slice();
  mergeSort(array, 0, array.length - 1, auxArray, animations);

  return animations;
}

function mergeSort(
  mainArray: number[],
  left: number,
  right: number,
  auxArray: number[],
  animations: number[][]
) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(auxArray, left, mid, mainArray, animations);
    mergeSort(auxArray, mid + 1, right, mainArray, animations);
    doMerge(mainArray, left, mid, right, auxArray, animations);
  }
}

function doMerge(
  mainArray: number[],
  left: number,
  mid: number,
  right: number,
  auxArray: number[],
  animations: number[][]
) {
  let k = left;
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {
    // these are the values we are comparing; push them once to change their color
    animations.push([i, j]);
    // push them a second time to revert their color
    animations.push([i, j]);

    if (auxArray[i] <= auxArray[j]) {
      // we overwrite the value at index k in the original array with
      // the value at index i in the auxArray
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxArray
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }

  while (i <= mid) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }

  while (j <= right) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
}

export function getQuickSort(array: number[]) {
  const animations: number[][] = [];

  quickSort(array, 0, array.length - 1, animations);
  return animations;
}
function quickSort(
  mainArray: number[],
  start: number,
  end: number,
  animations: number[][]
) {
  if (start < end) {
    let pivot = partition(mainArray, start, end, animations);

    quickSort(mainArray, start, pivot - 1, animations);
    quickSort(mainArray, pivot + 1, end, animations);
  }
}

function partition(
  array: number[],
  start: number,
  end: number,
  animations: number[][]
) {
  let pivot = end;
  // Set i to start - 1 so that it can access the first index in the event that the value at arr[0] is greater than arr[pivot]
  let i = start - 1;
  let j = start;

  while (j < pivot) {
    console.log('j %d -- pivot %d', j, pivot);
    animations.push([j, pivot]);
    animations.push([j, pivot]);
    if (array[j] > array[pivot]) {
      j++;
    } else {
      // When the value at arr[j] is less than the pivot:
      // increment i (arr[i] will be a value greater than arr[pivot]) and swap the value at arr[i] and arr[j]
      animations.push([i, array[j]]);
      i++;
      swap(array, i, j);
      j++;
    }
  }

  //The value at arr[i + 1] will be greater than the value of arr[pivot]
  animations.push([i + 1, pivot]);
  animations.push([i + 1, pivot]);
  animations.push([i + 1, array[pivot]]);
  swap(array, i + 1, pivot);

  //You return i + 1, as the values to the left of it are less than arr[i+1], and values to the right are greater than arr[i + 1]
  // As such, when the recursive quicksorts are called, the new sub arrays will not include this the previously used pivot value
  return i + 1;
}

function swap(array: number[], firstIndex: number, secondIndex: number) {
  let tmp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = tmp;
}
