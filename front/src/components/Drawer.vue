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
    display: flex;
    justify-content: center;
    align-items: start;
    position: absolute;
    z-index: 10000;
    width: 100%;
    height: 100%;
    right: 0;
    top: 0;
    padding: 30px;
    opacity: 0;
    transition: opacity .2s;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.60);
    backdrop-filter: blur(25px);
  }

  .drawer.open {
    pointer-events: all;
    opacity: 1;
  }

  .drawer .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
</style>