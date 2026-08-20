<template>
    <nav
        class="grid place-items-center gap-8 pt-10 lg:grid-cols-[120px_1fr_120px] lg:gap-10 lg:pt-4"
        aria-label="Навигация по проектам"
    >
        <NuxtLink
            :to="previousProjectTo"
            class="-my-6 hidden h-24 w-40 items-center justify-center transition lg:inline-flex"
            :class="
                previousId ? 'text-ffb9D1 hover:text-4f484c' : ' text-ffb9D1/35'
            "
            aria-label="Предыдущий проект"
            :aria-disabled="previousId ? undefined : 'true'"
            :tabindex="previousId ? undefined : -1"
            @focus="setHoveredDirection('previous')"
            @blur="setHoveredDirection(null)"
            @pointerenter="setHoveredDirection('previous')"
            @pointerleave="setHoveredDirection(null)"
        >
            <svg
                class="h-auto w-[120px]"
                width="120"
                height="62"
                viewBox="0 0 120 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M120 31H7M7 31L45 2M7 31L45 60"
                    stroke="currentColor"
                    stroke-width="5"
                />
            </svg>
        </NuxtLink>

        <Transition name="project-navigation-label" mode="out-in">
            <p
                :key="visibleLabel"
                class="max-w-[10ch] text-center font-neutral-face text-[clamp(2.75rem,12vw,3.875rem)] font-normal uppercase leading-[105%] tracking-[0] text-4f484c lg:max-w-none lg:text-[62px]"
            >
                {{ visibleLabel }}
            </p>
        </Transition>

        <NuxtLink
            :to="nextProjectTo"
            class="-my-6 inline-flex h-24 w-40 items-center justify-center transition"
            :class="
                nextId ? 'text-ffb9D1 hover:text-4f484c' : ' text-ffb9D1/35'
            "
            aria-label="Следующий проект"
            :aria-disabled="nextId ? undefined : 'true'"
            :tabindex="nextId ? undefined : -1"
            @focus="setHoveredDirection('next')"
            @blur="setHoveredDirection(null)"
            @pointerenter="setHoveredDirection('next')"
            @pointerleave="setHoveredDirection(null)"
        >
            <svg
                class="h-auto w-[120px] max-lg:w-[140px]"
                width="120"
                height="62"
                viewBox="0 0 120 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 31H113M113 31L75 2M113 31L75 60"
                    stroke="currentColor"
                    stroke-width="5"
                />
            </svg>
        </NuxtLink>
    </nav>
</template>

<script lang="ts" setup>
import {
    getProjectNavigationLabel,
    type ProjectNavigation,
    type ProjectNavigationDirection,
} from "@/utils/project-navigation";

interface Props extends ProjectNavigation {
    currentTo: string;
}

const props = defineProps<Props>();
const hoveredDirection = ref<ProjectNavigationDirection | null>(null);

const previousProjectTo = computed(() => {
    return props.previousId ? `/projects/${props.previousId}` : props.currentTo;
});
const nextProjectTo = computed(() => {
    return props.nextId ? `/projects/${props.nextId}` : props.currentTo;
});
const visibleLabel = computed(() =>
    getProjectNavigationLabel(props, hoveredDirection.value),
);

const setHoveredDirection = (direction: ProjectNavigationDirection | null) => {
    hoveredDirection.value = direction;
};
</script>

<style scoped>
.project-navigation-label-enter-active,
.project-navigation-label-leave-active {
    transition:
        opacity 300ms ease,
        transform 300ms ease;
}

.project-navigation-label-enter-from {
    opacity: 0;
    transform: translateY(0.4em);
}

.project-navigation-label-leave-to {
    opacity: 0;
    transform: translateY(-0.4em);
}
</style>
