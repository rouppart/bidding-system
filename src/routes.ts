import Home from './pages/Home.svelte';
import SimpleBids from './pages/SimpleBids.svelte';
import LaborBids from './pages/LaborBids.svelte';

export default  {
  '/': Home,
  '/simple': SimpleBids,
  '/labor': LaborBids
}