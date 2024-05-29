<script setup>
defineProps(['open'])
defineEmits(['close'])
</script>

<template>
    <div class="drawer" :class="{open: open}">
        <div class="backdrop" @click="$emit('close')" />
        <button class="drawer-close" @click="$emit('close')">
          <svg class="close-icon" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 13.8293L18.0708 20.9C18.446 21.2752 18.9549 21.486 19.4855 21.486C20.0161 21.486 20.5249 21.2752 20.9001 20.9C21.2753 20.5248 21.4861 20.0159 21.4861 19.4853C21.4861 18.9547 21.2753 18.4459 20.9001 18.0707L13.8268 11L20.8988 3.92933C21.0845 3.74356 21.2318 3.52302 21.3322 3.28033C21.4327 3.03763 21.4844 2.77753 21.4843 2.51486C21.4842 2.2522 21.4324 1.99211 21.3319 1.74947C21.2313 1.50682 21.0839 1.28636 20.8981 1.10067C20.7123 0.914978 20.4918 0.767698 20.2491 0.667238C20.0064 0.566777 19.7463 0.515102 19.4837 0.515164C19.221 0.515226 18.9609 0.567023 18.7183 0.667598C18.4756 0.768173 18.2551 0.915557 18.0695 1.10133L11.0001 8.172L3.92946 1.10133C3.74505 0.910228 3.52444 0.757762 3.28048 0.65283C3.03652 0.547899 2.77411 0.492603 2.50855 0.490171C2.24299 0.487739 1.97961 0.538219 1.73377 0.638665C1.48793 0.739111 1.26456 0.887511 1.07669 1.07521C0.888814 1.2629 0.740203 1.48614 0.639526 1.73188C0.538848 1.97762 0.48812 2.24096 0.490302 2.50652C0.492483 2.77208 0.547531 3.03454 0.652232 3.2786C0.756933 3.52265 0.909192 3.74342 1.10012 3.928L8.17346 11L1.10146 18.072C0.910526 18.2566 0.758267 18.4773 0.653566 18.7214C0.548864 18.9655 0.493817 19.2279 0.491635 19.4935C0.489454 19.759 0.540181 20.0224 0.640859 20.2681C0.741537 20.5139 0.890148 20.7371 1.07802 20.9248C1.26589 21.1125 1.48927 21.2609 1.73511 21.3613C1.98094 21.4618 2.24433 21.5123 2.50988 21.5098C2.77544 21.5074 3.03785 21.4521 3.28181 21.3472C3.52577 21.2422 3.74639 21.0898 3.93079 20.8987L11.0001 13.8293Z"/>
          </svg>
        </button>
        <slot></slot>
    </div>
</template>

<style scoped>
  .drawer {
    position: absolute;
    z-index: 10000;
    width: 100%;
    height: 100%;
    right: 0;
    top: 0;
    padding: 30px;
    pointer-events: none;
  }

  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.60);
    backdrop-filter: blur(25px);
  }

  .drawer.open {
    pointer-events: all;
    opacity: 1;
  }

  .drawer.open .backdrop {
    opacity: 1;
  }

  .drawer-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background: transparent;
    border: 0;
    opacity: .5;
    transition: opacity .2s, transform .4s ease-out;
    transform-origin: center center;
  }

  .drawer-close:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  .close-icon {
    width: 12px;
    fill: black;
  }
</style>