<template>
    <h2 class="text-[18px] lg:text-2xl text-1c1a20 font-neutral-face">
        {{ label }}
    </h2>
</template>

<script setup lang="ts">
defineProps<{
    label: string;
}>();
</script>
