<script lang="ts">
  import type {Bids} from '../global.d.';

  export let bids: Bids;
  export let avalability: number;

  let localAvailability: number = avalability;

  $: avalability = Math.min(Math.max(localAvailability, 1), bids.length - 1);

	$: sortedBids = [...bids].sort((el1, el2) => el2.bid - el1.bid);

	$: price = (sortedBids[avalability - 1].bid + sortedBids[avalability].bid) / 2;

	$: totalCompensations = avalability * price;

	$: compensationAmount = Math.round(totalCompensations / (bids.length - avalability) * 100) / 100;

	function computeData(bids: Bids, availability: number) {
		const res = [];

		for (let i = 0; i < bids.length; i++) {
			if (i < availability) {
				res.push({name: bids[i].name, bid: bids[i].bid, take: price, give: null});
			} else {
				res.push({name: bids[i].name, bid: bids[i].bid, take: null, give: compensationAmount});
			}
		}
		return res;
	}
	$: data = computeData(sortedBids, avalability);
</script>

<div class="my-5">
  <label>
    Avalability: <input type="number" class="w-20" bind:value={localAvailability}>
  </label>
</div>
<table>
  <tr>
    <th>Names</th>
    <th>Bids</th>
    <th>Payments</th>
    <th>Compensation</th>
  </tr>

  {#each data as row, pos}
    <tr class:border-t-2={pos === avalability}>
      <td>
        {row.name}
      </td>
      <td>
        <div class="bg-blue-300 rounded text-center py-0.5 my-1 ml-auto mr-3" style="width:{row.bid}rem">
          {row.bid}
        </div>
      </td>
      <td>
        {#if row.take !== null}
          <div class="bg-red-300 rounded text-center py-0.5 mx-3" style="width:{row.take}rem">
            {row.take}
          </div>
        {/if}
      </td>
      <td>
        {#if row.give !== null}
          <div class="bg-green-300 rounded text-center py-0.5 mx-3" style="width:{row.give}rem">
            {row.give}
          </div>
        {/if}
      </td>
    </tr>
  {/each}
</table>