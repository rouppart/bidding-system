<script lang="ts">
  import type {Bids, Bid} from '../global.d.';

  export let bids: Bids;

  function deleteBid(bid: Bid) {
    bids = bids.filter((b) => bid !== b)
  }

  function addBid() {
    const newBid: Bid = {name: '', bid: 0};
    bids = [...bids, newBid];
  }
</script>

<style lang="postcss">
  th, td {
    @apply px-2 py-1;
  }
</style>

<table>
  <tr>
    <th>Name</th>
    <th>Price</th>
  </tr>
  {#each bids as bid}
    <tr>
      <td><input type="text" class="w-48" bind:value={bid.name}></td>
      <td><input type="number" class="w-24" bind:value={bid.bid}></td>
      <td><button class="font-bold text-gray-500 px-2 py-1" on:click={deleteBid.bind(null, bid)}>X</button></td>
    </tr>
  {/each}
  <tr>
    <td colspan="2"></td>
    <td>
      <button class="text-xl font-bold text-gray-500 px-2 py-1" on:click={addBid}>+</button>
    </td>
  </tr>
</table>