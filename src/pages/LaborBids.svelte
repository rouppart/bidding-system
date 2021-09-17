<script lang="ts">
  import type {LaborBid} from '../global';

	import sample from '../sample_laborbids';

	import BidsViewer from '../components/LaborBidsViewer.svelte';
	import BidsEditor from '../components/LaborBidsEditor.svelte';

	let bids: LaborBid[] = sample;

  let requiredWork = 100;

	let editMode = false;
  $: editButtonText = editMode ? 'View Bids' : 'Edit Bids';
</script>

<h1 class="text-2xl font-bold my-5">Labor Bids</h1>
<button class="bg-gray-400 rounded font-bold px-3 py-2" on:click={() => {editMode = !editMode}}>{editButtonText}</button>
{#if editMode}
  <BidsEditor bind:bids />
{:else}
  <BidsViewer {bids} bind:requiredWork />
{/if}