/// <reference types="svelte" />
/// <reference types="vite/client" />

export interface SimpleBid {
  name: string
  bid: number
}

export interface LaborBid {
  name: string
  capacity: number
  buy: number
  sell: number
}

export interface ProcessedLaborBid extends LaborBid {
  remainingCapacity: number
  owedWork: number
  money: number
}