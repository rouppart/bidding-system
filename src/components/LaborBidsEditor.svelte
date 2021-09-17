<script lang="ts">
  import type {LaborBid} from '../global';

  export let bids: LaborBid[];

  function deleteBid(bid: LaborBid) {
    if (bids.length > 2) {
      bids = bids.filter(e => e !== bid);
    } else {
      alert('Cannot have less than 2 bids');
    }
  }

  function addBid() {
    const newBid: LaborBid = {name: '', capacity: 1, buy: 0, sell: 0};
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
    <th>Capacity</th>
    <th>Buy</th>
    <th>Sell</th>
  </tr>
  {#each bids as bid}
    <tr>
      <td><input type="text" class="w-48" bind:value={bid.name}></td>
      <td><input type="number" class="w-24" bind:value={bid.capacity}></td>
      <td><input type="number" class="w-24" bind:value={bid.buy}></td>
      <td><input type="number" class="w-24" bind:value={bid.sell}></td>
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