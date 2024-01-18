<script setup>
defineProps(['open'])
defineEmits(['close'])
</script>

<template>
    <div class="drawer" :class="{open: open}">
        <button class="drawer-close" @click="$emit('close')">close</button>

        <slot></slot>
    </div>
</template>

<style scoped>
  .drawer {
    position: absolute;
    z-index: 10000;
    right: 0;
    top: 0;
    transform: translateX(100%);
    transition: transform .2s;
    pointer-events: all;
  }

  .drawer.open {
    pointer-events: all;
    transform: translateX(0);
  }

  .drawer .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
</style>