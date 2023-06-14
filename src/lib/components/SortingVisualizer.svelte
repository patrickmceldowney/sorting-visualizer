<script lang="ts">
  import { onMount } from 'svelte';
  import {
    bubbleSort,
    getMergeSort,
    getQuickSort,
  } from '../tools/sortingAlgorithms';
  import type { Move } from '../tools/types';

  const ANIMATION_SPEED = 1;
  const PRIMARY_COLOR = '#FF715B';
  const SECONDARY_COLOR = '#2F52E0';
  const BAR_WIDTH = 6;

  let array: number[] = [];
  let windowWidth: number;
  let container: HTMLElement;
  let timer: number;

  onMount(() => resetArray());

  function resetArray() {
    if (timer) {
      clearTimeout(timer);
    }
    array = [];
    for (let i = 0; i < (windowWidth - 200) / BAR_WIDTH; i++) {
      array.push(randomIntFromInterval(5, 450));
    }
    array = array;
    showBars();
  }

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function performMergeSort() {
    console.time('mergeSort');
    const moves = getMergeSort([...array]);
    console.timeEnd('mergeSort');

    animate(moves);
    showBars();
  }

  function performQuickSort() {
    console.time('quickSort');
    const moves = getQuickSort([...array]);
    console.timeEnd('quickSort');

    animate(moves);
    showBars();
  }
  function performHeapSort() {}

  function performBubbleSort() {
    console.time('bubbleSort');
    const moves = bubbleSort([...array]);
    console.timeEnd('bubbleSort');

    animate(moves);
    showBars();
  }

  function animate(moves: Move[]) {
    if (!moves.length) {
      showBars();
      return;
    }

    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type === 'swap') {
      [array[i], array[j]] = [array[j], array[i]];
    }

    showBars(move);
    timer = setTimeout(() => {
      animate(moves);
    }, ANIMATION_SPEED);
  }

  function showBars(move: Move = undefined) {
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div');
      bar.style.height = `${array[i]}px`;
      bar.style.width = `${BAR_WIDTH}px`;
      bar.style.display = 'inline-block';
      bar.style.backgroundColor = PRIMARY_COLOR;
      bar.classList.add('array-bar');
      bar.style.borderRadius = '0 0 2px 2px';

      if (move && move.indices.includes(i)) {
        bar.style.backgroundColor =
          move.type === 'swap' ? SECONDARY_COLOR : PRIMARY_COLOR;
      }
      container.appendChild(bar);
    }
  }
</script>

<svelte:window bind:innerWidth={windowWidth} />
<div class="array-container">
  <div class="button-wrapper">
    <button on:click={resetArray} type="button">Generate New Array</button>
    <button on:click={performMergeSort} type="button">Merge Sort</button>
    <button on:click={performQuickSort} type="button">Quick Sort</button>
    <button on:click={performHeapSort} type="button">Heap Sort</button>
    <button on:click={performBubbleSort} type="button">Bubble Sort</button>
  </div>

  <div class="bar-wrapper" bind:this={container}>
    <!-- {#each array as value (uuidv4())}
      <div
        class="array-bar"
        style={`background-color: ${PRIMARY_COLOR}; height: ${value}px`}
      />
    {/each} -->
  </div>
</div>

<style>
  .array-container {
    display: flex;
    inset: 0;
    flex-direction: column;
    gap: 20px;
    min-height: 100vh;
  }

  .bar-wrapper {
    display: flex;
    flex-wrap: nowrap;
    /* gap: 1px; */
    width: 100%;
    height: 100%;
  }
</style>
