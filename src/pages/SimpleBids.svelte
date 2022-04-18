<script lang="ts">
  import type {SimpleBid} from '../vite-env';

	import sample from '../sample_simplebids';

	import BidsViewer from '../components/SimpleBidsViewer.svelte';
	import BidsEditor from '../components/SimpleBidsEditor.svelte';

	let bids: SimpleBid[] = sample;

	let availability: number = 5;

	let editMode = false;
  $: editButtonText = editMode ? 'View Bids' : 'Edit Bids';
</script>

<h1 class="text-2xl font-bold my-5">Simple Bids</h1>
<button class="bg-gray-400 rounded font-bold px-3 py-2" on:click={() => {editMode = !editMode}}>{editButtonText}</button>
{#if editMode}
  <BidsEditor bind:bids />
{:else}
  <BidsViewer {bids} bind:availability />
{/if}