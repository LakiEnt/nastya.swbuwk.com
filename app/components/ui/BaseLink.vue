<template>
    <NuxtLink
        :href="to"
        class="text-t1 lg:text-xl text-4f484c hover:text-ffb9D1 transition-colors duration-300"
        >{{ label }}</NuxtLink
    >
</template>
<script lang="ts" setup>
interface Props {
    to: string;
    label: string;
}
defineProps<Props>();
</script>
