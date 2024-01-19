<script setup>
import DChart from './components/DChart.vue'
</script>

<template>
  <div class="app">
    <DChart />
  </div>
</template>

<style>
:root {
  --primary: #DE5252;
  --border-radius : 20px;
  --search-max-width: 800px;
  --text-color: black;
  --subtext-color: #444444;
  --placeholder-color: #949494;
  --border-color: #D7D7D7;
  --border-width: 1px;
  --shadow: 0px 2px 20px 15px #0000000D;
  --active-shadow: 0px 2px 20px 15px #DE52520D;

  /* team colors */
  --research-color: #7A9CC6;
  --revenue-color: #FDCA40;
  --product-color: #1D7A8F;
  --professional-color: #4EBF6E;
  --accounting-color: #F9937D;
  --cloudop-color: #817E9F;
  --hr-color: #AFBA32;
  --marketing-color: #AA4586;
}

.app, #app {
  width: 100vw;
  height: 100vh;
}

</style>
