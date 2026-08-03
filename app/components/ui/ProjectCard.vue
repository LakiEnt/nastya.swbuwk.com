<template>
    <NuxtLink
        :to="`/projects/${project.id}`"
        class="flex max-lg:flex-col max-lg:space-y-4.5 lg:space-x-10 justify-between"
    >
        <picture class="bg-[#F1F1F2]">
            <source :srcset="project.image.webp" type="image/webp" />
            <img
                :src="project.image.src"
                :alt="project.image.alt"
                :width="project.image.width"
                :height="project.image.height"
            />
        </picture>

        <div class="flex flex-col justify-between">
            <div class="flex justify-between">
                <p class="text-t1 text-4f484c">{{ project.year }}</p>
                <div class="lg:max-w-82.5">
                    <h3
                        class="text-1c1a20 leading-none font-neutral-face text-[18px] lg:text-2xl text-right"
                    >
                        {{ project.title }}
                    </h3>
                    <p class="mt-1.5 text-right text-4f484c">
                        {{ project.type }}
                    </p>
                </div>
            </div>
            <p
                class="text-right text-pretty max-lg:mt-3 lg:max-w-135.5 text-t1 line-clamp-3"
            >
                {{ project.description }}
            </p>
        </div>
    </NuxtLink>
</template>
<script setup>
defineProps({
    project: {
        type: Object,
        required: true,
    },
});
</script>
