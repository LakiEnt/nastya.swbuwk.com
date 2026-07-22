<template>
    <Html>
        <Body class="font-onest">
            <div class="relative flex min-h-screen flex-col">
                <LayoutHeader />
                <div class="pt-14 lg:pt-16">
                    <slot />
                </div>
                <LayoutFooter />
            </div>
        </Body>
    </Html>
</template>
<script lang="ts" setup>
import LayoutHeader from "~/components/LayoutHeader.vue";
import LayoutFooter from "~/components/LayoutFooter.vue";
</script>
<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.5s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}
</style>
