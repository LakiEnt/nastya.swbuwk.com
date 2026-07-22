<template>
    <main
        v-if="project"
        class="container space-y-10 pb-20 pt-13.75 lg:space-y-20 lg:pb-32 lg:pt-15"
    >
        <section class="max-w-4xl space-y-6 lg:space-y-8 ">
            <NuxtLink
                to="/projects"
                class="text-t1 text-4f484c/60 transition hover:text-4f484c"
            >
                Назад к проектам
            </NuxtLink>

            <h1
                class="font-neutral-face text-3xl leading-[112%] text-1c1a20 lg:text-6xl mt-4"
            >
                {{ project.title }}
            </h1>

            <p
                v-if="project.detailDescriptions[0]"
                class="max-w-3xl text-t1 text-4f484c lg:text-20"
            >
                {{ project.detailDescriptions[0] }}
            </p>
        </section>

        <section class="grid gap-5 lg:grid-cols-2">
            <img
                v-for="image in firstImages"
                :key="image.src"
                class="aspect-[655/373] w-full rounded-lg bg-bw-25 object-cover"
                :src="image.src"
                :alt="image.alt"
                :width="image.width"
                :height="image.height"
            >
        </section>

        <p
            v-if="project.detailDescriptions[1]"
            class="max-w-3xl text-t1 text-4f484c lg:text-20"
        >
            {{ project.detailDescriptions[1] }}
        </p>

        <section class="grid gap-5 lg:grid-cols-2">
            <img
                v-for="image in lastImages"
                :key="image.src"
                class="aspect-[655/373] w-full rounded-lg bg-bw-25 object-cover"
                :src="image.src"
                :alt="image.alt"
                :width="image.width"
                :height="image.height"
            >
        </section>
    </main>
</template>

<script setup>
const route = useRoute();
const { data: project, error } = await useFetch(`/api/projects/${route.params.slug}`);

if (error.value) {
    throw createError({
        statusCode: error.value.statusCode ?? 404,
        statusMessage: "Project not found",
    });
}

const firstImages = computed(() => project.value?.galleryImages.slice(0, 2) ?? []);
const lastImages = computed(() => project.value?.galleryImages.slice(2, 4) ?? []);
</script>
