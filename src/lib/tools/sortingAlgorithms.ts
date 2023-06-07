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
