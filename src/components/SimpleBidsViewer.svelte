<script lang="ts">
  import type {SimpleBid} from '../vite-env';

  export let bids: SimpleBid[];
  export let availability: number;

  $: adjustedAvailability = Math.min(Math.max(availability, 1), bids.length - 1);

	$: sortedBids = [...bids].sort((el1, el2) => el2.bid - el1.bid);

	$: price = (sortedBids[adjustedAvailability - 1].bid + sortedBids[adjustedAvailability].bid) / 2;

	$: totalCompensations = adjustedAvailability * price;

	$: compensationAmount = Math.round(totalCompensations / (bids.length - adjustedAvailability) * 100) / 100; // Rounded to .01

  $: processedBids = sortedBids.map((e: SimpleBid, index) => {return {
    name: e.name,
    bid: e.bid,
    take: index < adjustedAvailability ? price : null,
    give: index < adjustedAvailability ? null : compensationAmount
  }});

  $: remRatio = sortedBids[0].bid / 36;
</script>


<div class="my-5">
  <label>
    Avalability: <input type="number" class="w-20" bind:value={availability}>
  </label>
</div>

<table class="bidtable">
  <tr>
    <th>Names</th>
    <th>Bids</th>
    <th>Payments</th>
    <th>Compensation</th>
  </tr>

  {#each processedBids as row, pos}
  <tr class:border-t-2={pos === adjustedAvailability}>
    <td>
      {row.name}
    </td>
    <td class="text-right">
      <div class="bar bg-yellow-200 rounded" style="width:{row.bid / remRatio}rem">
        {row.bid}
      </div>
    </td>
    <td>
      {#if row.take !== null}
        <div class="bar bg-red-300 rounded" style="width:{row.take / remRatio}rem">
          {row.take}
        </div>
      {/if}
    </td>
    <td>
      {#if row.give !== null}
        <div class="bar bg-green-300 rounded" style="width:{row.give / remRatio}rem">
          {row.give}
        </div>
      {/if}
    </td>
  </tr>
  {/each}
</table>