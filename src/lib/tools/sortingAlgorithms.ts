export function getMergeSort(array: number[]) {
  const animations: number[][] = [];

  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);

  return animations;
}

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxArray: number[],
  animations: number[][]
) {
  if (startIdx === endIdx) return;

  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations);
}

function doMerge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxArray: number[],
  animations: number[][]
) {
  let k = startIdx;
  let i = middleIdx;
  let j = endIdx;

  while (i <= middleIdx && j <= endIdx) {
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

  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }

  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
}
