<script setup lang="ts">
import GoChart from './components/GoChart.vue'
import DChart from './components/DChart.vue'
</script>

<template>
  <div class="app">
    <!-- <GoChart /> -->
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
}

.app, #app {
  width: 100vw;
  height: 100vh;
}

</style>
