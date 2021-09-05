<script lang="ts">
	import type {Bids} from '../global.d.';

	import sample from '../sample_simplebids';

	import BidsViewer from '../components/BidsViewer.svelte';
	import BidsEditor from '../components/BidsEditor.svelte';

	let bids: Bids = sample;

	let avalability: number = 5;

	let editMode = false;
</script>

<h1 class="text-2xl font-bold my-5">Simple Bids</h1>
<button class="bg-gray-400 rounded font-bold px-3 py-2" on:click={() => {editMode = !editMode}}>
  {#if editMode}
    View Bids
  {:else}
    Edit Bids
  {/if}
</button>
{#if editMode}
  <BidsEditor bind:bids />
{:else}
  <BidsViewer {bids} bind:avalability />
{/if}