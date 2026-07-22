<template>
    <main class="min-h-screen bg-bw-15 text-4f484c">
        <header class="border-b border-4f484c/10 bg-white">
            <div
                class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10"
            >
                <NuxtLink
                    to="/admin"
                    class="font-neutral-face text-2xl leading-none text-4f484c"
                >
                    Admin
                </NuxtLink>

                <NuxtLink
                    to="/admin"
                    class="rounded-md border border-4f484c/15 px-4 py-2 text-sm transition hover:border-4f484c/35"
                >
                    Назад
                </NuxtLink>
            </div>
        </header>

        <section class="mx-auto max-w-7xl px-5 py-8 lg:px-10 lg:py-12">
            <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p class="text-t1 text-4f484c/60">Админ панель</p>
                    <h1
                        class="mt-3 font-neutral-face text-4xl leading-[105%] lg:text-6xl"
                    >
                        Проекты
                    </h1>
                </div>

                <button
                    class="inline-flex h-11 items-center justify-center rounded-md bg-ffb9D1 px-5 text-base font-bold text-4f484c transition hover:bg-ffb9D1/80 disabled:cursor-not-allowed disabled:opacity-60"
                    :disabled="isCreating"
                    type="button"
                    @click="createProject"
                >
                    {{ isCreating ? "Создаем..." : "Создать проект" }}
                </button>
            </div>

            <div class="mt-10 overflow-hidden rounded-lg border border-4f484c/10 bg-white">
                <div
                    v-if="!projects?.length"
                    class="px-5 py-10 text-center text-4f484c/60"
                >
                    Проектов пока нет
                </div>

                <NuxtLink
                    v-for="project in projects"
                    :key="project.id"
                    :to="`/admin/projects/${project.id}`"
                    class="grid gap-4 border-b border-4f484c/10 px-5 py-4 transition last:border-b-0 hover:bg-bw-15 lg:grid-cols-[72px_1fr_auto] lg:items-center"
                >
                    <img
                        class="h-16 w-18 rounded-md bg-bw-25 object-cover"
                        :src="project.image.src"
                        :alt="project.image.alt"
                        width="72"
                        height="64"
                    >

                    <div>
                        <p class="text-sm text-4f484c/60">
                            #{{ project.id }} · {{ project.year }} · {{ project.type }}
                        </p>
                        <h2 class="mt-1 text-xl font-bold text-1c1a20">
                            {{ project.title }}
                        </h2>
                        <p class="mt-1 line-clamp-2 text-t1 text-4f484c/70">
                            {{ project.description }}
                        </p>
                    </div>

                    <button
                        class="h-10 rounded-md border border-red-200 px-4 text-sm text-red-700 transition hover:bg-red-50"
                        type="button"
                        @click.prevent.stop="deleteProject(project.id)"
                    >
                        Удалить
                    </button>
                </NuxtLink>
            </div>
        </section>
    </main>
</template>

<script setup>
definePageMeta({
    layout: false,
});

const { data: projects, refresh } = await useFetch("/api/admin/projects", {
    default: () => [],
});
const isCreating = ref(false);

async function createProject() {
    isCreating.value = true;

    try {
        const response = await $fetch("/api/admin/projects", {
            method: "POST",
        });

        await navigateTo(`/admin/projects/${response.project.id}`);
    } finally {
        isCreating.value = false;
    }
}

async function deleteProject(id) {
    await $fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
    });
    await refresh();
}
</script>
