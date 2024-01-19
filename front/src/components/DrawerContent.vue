<script setup>
const props = defineProps(['node'])

</script>

<template>
    <div class="drawer-content">        
        <div class="profil">
            <img :src="node?.profileUrl ?? ''">
        </div>
        
        <p class="name">{{ node?.name ?? "name placeholder" }}</p>
        <p class="id">{{ node?.id ?? "missing placeholder" }}</p>
        <p class="position">{{ node?.positionName ?? "no position" }}</p>
        <p class="start-date">{{ node?.startDate ?? "start date missing" }}</p>
        <p class="tags">{{ node?.tags ?? "No tags" }}</p>
    </div>
</template>

<style scoped>
    .drawer-content {
        width: 100%;
        max-width: 300px;
        border-radius: 20px 0 0 20px;   
    }
    .profil {
        width: 100px;
        height: 100px;
        border-radius: 100%;
    }

    .profil img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>