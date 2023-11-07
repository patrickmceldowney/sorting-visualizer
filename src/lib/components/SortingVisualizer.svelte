<script lang="ts">
  import { onMount } from 'svelte';
  import {
    bubbleSort,
    getMergeSort,
    getQuickSort,
  } from '../tools/sortingAlgorithms';
  import type { Move } from '../tools/types';

  const ANIMATION_SPEED = 10;
  const PRIMARY_COLOR = '#FF715B';
  const SECONDARY_COLOR = '#2F52E0';
  const BAR_WIDTH = 6;

  let array: number[] = [];
  let windowWidth: number;
  let container: HTMLElement;
  let timer: number;
  let audioCtx: AudioContext;
  let sorting = false;

  onMount(() => resetArray());

  function cancel() {
    if (timer) {
      clearTimeout(timer);
      sorting = false;
    }
  }

  /**
   * Reset bars
   */
  function resetArray() {
    if (timer) {
      clearTimeout(timer);
      sorting = false;
    }
    array = [];
    for (let i = 0; i < (windowWidth - 200) / BAR_WIDTH; i++) {
      array.push(randomIntFromInterval(5, 450));
    }
    array = array;
    showBars();
  }

  /**
   * Get a random unsorted interval
   * @param min
   * @param max
   */
  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function performSort(sort: 'quick' | 'merge' | 'bubble' | 'heap') {
    let moves: Move[] = [];
    switch (sort) {
      case 'quick':
        moves = getQuickSort(array);
        break;
      case 'merge':
        moves = getMergeSort(array);
        break;
      case 'bubble':
        moves = bubbleSort(array);
        break;
      default:
        break;
    }
    animate(moves);
  }

  /**
   * Animate bars
   * @param moves
   */
  async function animate(moves: Move[]) {
    if (!moves.length) {
      showBars();
      sorting = false;
      return;
    }

    sorting = true;

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

  /**
   * Render bars on screen
   * @param move
   */
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
    <button on:click={resetArray} disabled={sorting} type="button">
      Generate New Array
    </button>
    <button
      on:click={() => performSort('merge')}
      disabled={sorting}
      type="button"
    >
      Merge Sort
    </button>
    <button
      on:click={() => performSort('quick')}
      disabled={sorting}
      type="button"
    >
      Quick Sort
    </button>
    <!-- <button on:click={() => performSort('heap')} disabled={sorting} type="button"
      >Heap Sort</button
    > -->
    <button
      on:click={() => performSort('bubble')}
      disabled={sorting}
      type="button"
    >
      Bubble Sort
    </button>
    <button on:click={cancel} type="button">Cancel</button>
  </div>

  <div class="bar-wrapper" bind:this={container} />
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
    gap: 1px;
    width: 100%;
    height: 100%;
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
</style>
