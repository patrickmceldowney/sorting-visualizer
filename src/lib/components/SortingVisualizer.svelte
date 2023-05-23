<script lang="ts">
  import { getMergeSort } from '../tools/sortingAlgorithms';

  const ANIMATION_SPEED = 1;
  const BARS = 310;
  const PRIMARY_COLOR = '#FF715B';
  const SECONDARY_COLOR = '#2F52E0';

  let array: number[] = [];

  function resetArray() {
    array = [];
    for (let i = 0; i < BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
  }

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function arraysAreEqual(array1: any[], array2: any[]) {
    if (array1.length !== array2.length) return false;

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }

  function mergeSort() {
    const animations = getMergeSort(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = Array.from(
        document.getElementsByClassName(
          'array-bar'
        ) as HTMLCollectionOf<HTMLElement>
      );
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED);
      }
    }
  }

  function quickSort() {}
  function heapSort() {}
  function bubbleSort() {}

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  function testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let j = 0; j < length; j++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const sortedArray = array.slice().sort((a, b) => a - b);
      const mergeArray = getMergeSort(array.slice());
      console.log('Arrays equal: ', arraysAreEqual(sortedArray, mergeArray));
    }
  }
</script>

<div class="array-container">
  <div class="bar-wrapper">
    {#each array as value, i (i)}
      <div
        class="array-bar"
        style={`background-color: ${PRIMARY_COLOR}; height: ${value}px`}
      />
    {/each}
  </div>

  <div class="button-wrapper">
    <button on:click={resetArray} type="button">Generate New Array</button>
    <button on:click={mergeSort} type="button">Merge Sort</button>
    <button on:click={quickSort} type="button">Quick Sort</button>
    <button on:click={heapSort} type="button">Heap Sort</button>
    <button on:click={bubbleSort} type="button">Bubble Sort</button>
    <button on:click={testSortingAlgorithms} type="button">
      Test Sorting Algorithms (BROKEN)
    </button>
  </div>
</div>

<style>
  .array-container {
    position: absolute;
    display: flex;
    inset: 0;
    flex-direction: column;
    gap: 20px;
  }

  .array-bar {
    width: 2px;
    display: inline-block;
    margin: 0 1px;
  }
</style>
