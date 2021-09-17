<script lang="ts">
  import type {LaborBid, ProcessedLaborBid} from '../global';

  export let bids: LaborBid[];
  export let requiredWork: number;

  $: bidCount = bids.length;

  function bidSorter(a: ProcessedLaborBid, b: ProcessedLaborBid) {
    if (a.money !== b.money) {  // Sort by lowest money to highest
      return a.money - b.money
    }

    if (a.money < 0) { // Sort Buyers by buy
      return b.buy - a.buy
    } else {  // Sort Sellers by sell
      return b.sell - a.sell;
    }
  }

  let processedBids: ProcessedLaborBid[];
  let neutralWork: number;
  let laborPrice: number;
  $: {
    neutralWork = requiredWork / bidCount;
    // Spread Work Evenly and sort by sell lowest to highest
    processedBids = bids.map(e => ({...e,
      remainingCapacity: Math.max(e.capacity - neutralWork, 0),
      owedWork: neutralWork,
      money: 0
    }));

    let buyCount = 0;
    let sellCount = 0;
    laborPrice = 0;
    const buySorted = [...processedBids].sort((a, b) => b.buy - a.buy); // Highest to lowest
    const sellSorted = [...processedBids].sort((a, b) => a.sell - b.sell); // Lowest to highest

    while (buyCount + sellCount < bidCount) {
      const buyBid = buySorted[buyCount];
      const sellBid = sellSorted[sellCount];

      if (buyBid.buy >= sellBid.sell) {  // If transaction can happen
        const transferredWork = Math.min(buyBid.owedWork, sellBid.remainingCapacity);
        buyBid.owedWork -= transferredWork;
        sellBid.owedWork += transferredWork;
        sellBid.remainingCapacity -= transferredWork;
        laborPrice = (buyBid.buy + sellBid.sell) / 2;
      } else {  // No more matches can happen
        break;
      }

      if (buyBid.owedWork <= 0) {  // If Buyer doesn't owe anymore
        buyCount++;
      }

      if (sellBid.remainingCapacity <= 0) {  // If seller can't work anymore
        sellCount++;
      }
    }

    // Reallocate money
    processedBids.map(e => {e.money = (e.owedWork - neutralWork) * laborPrice})

    // Resort
    processedBids.sort(bidSorter);
  }

	$: bidRemRatio = Math.max(...bids.map(e => e.sell)) / 30;
  $: capacityRatio = Math.max(...bids.map(e => e.capacity)) / 15;
  $: moneyRemRatio = Math.max(...processedBids.map(e => Math.abs(e.money)), 1) / 10;

  function format(n: number) {
    return Math.round(n * 100) / 100
  }
</script>

<div class="space-x-4 lg:w-1/2 flex justify-between items-center max-w-xl my-6">
  <label>
    <b>Required Work:</b> <input type="number" class="w-20" bind:value={requiredWork}>
  </label>
  <span>
    <b>Neutral Work:</b> {format(neutralWork)}
  </span>
  <span>
    <b>Labor Price:</b> {format(laborPrice)}
  </span>
</div>

<table class="bidtable">
  <colgroup>
    <col>
    <col class="border-r-2">
  </colgroup>
  <tr>
    <th>Names</th>
    <th>Bids</th>
    <th>Result</th>
  </tr>

  {#each processedBids as row}
  <tr>
    <td>
      {row.name}
    </td>

    <td class="text-right">
      <div class="bar bg-green-300 rounded-l" style="width:{(row.sell - row.buy) / bidRemRatio}rem">
        {row.sell}
      </div><div class="bar bg-red-300" class:rounded-r={row.capacity === 0} style="width:{row.buy / bidRemRatio}rem">
        {row.buy}
      </div>{#if row.capacity !== 0}<div class="bar bg-blue-300 rounded-r" style="width:{row.capacity / capacityRatio}rem">
        {row.capacity}
      </div>{/if}
    </td>

    <td>
      <div class="bar rounded-l {row.money > 0 ? 'bg-green-300' : 'bg-red-300'}" class:rounded-r={row.owedWork === 0}  style="width:{Math.abs(row.money) / moneyRemRatio}rem">
        {format(row.money)}
      </div>{#if row.owedWork !== 0}<div class="bar bg-blue-300 rounded-r" class:rounded-l={row.money === 0} style="width:{row.owedWork / capacityRatio}rem">
        {format(row.owedWork)}
      </div>{/if}
    </td>
  </tr>
  {/each}
</table>