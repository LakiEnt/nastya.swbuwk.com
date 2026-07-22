<template>
    <main class="min-h-screen bg-bw-15 text-4f484c">
        <header class="border-b border-4f484c/10 bg-white">
            <div
                class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10"
            >
                <NuxtLink
                    to="/admin/projects"
                    class="font-neutral-face text-2xl leading-none text-4f484c"
                >
                    Проекты
                </NuxtLink>

                <NuxtLink
                    to="/admin"
                    class="rounded-md border border-4f484c/15 px-4 py-2 text-sm transition hover:border-4f484c/35"
                >
                    В админку
                </NuxtLink>
            </div>
        </header>

        <section class="mx-auto max-w-7xl px-5 py-8 lg:px-10 lg:py-12">
            <NuxtLink
                to="/admin/projects"
                class="text-t1 text-4f484c/60 transition hover:text-4f484c"
            >
                Назад к списку
            </NuxtLink>

            <form
                v-if="project"
                class="mt-8 grid gap-8 lg:grid-cols-[420px_1fr] lg:items-start"
                @submit.prevent="saveProject"
            >
                <aside class="rounded-lg border border-4f484c/10 bg-white p-5">
                    <img
                        class="aspect-[655/373] w-full rounded-md bg-bw-25 object-cover"
                        :src="project.image.src"
                        :alt="project.image.alt"
                        :width="project.image.width"
                        :height="project.image.height"
                    >

                    <label class="mt-5 block">
                        <span class="text-sm text-4f484c/70">Заменить картинку</span>
                        <input
                            class="mt-2 block w-full text-sm text-4f484c file:mr-4 file:h-10 file:rounded-md file:border-0 file:bg-ffb9D1 file:px-4 file:text-sm file:font-bold file:text-4f484c"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            type="file"
                            @change="uploadImage"
                        >
                    </label>

                    <p
                        v-if="imageMessage"
                        class="mt-4 rounded-md bg-bw-15 px-4 py-3 text-sm text-4f484c/70"
                    >
                        {{ imageMessage }}
                    </p>

                    <div class="mt-8 grid gap-5">
                        <div
                            v-for="(galleryImage, index) in project.galleryImages"
                            :key="index"
                            class="rounded-md border border-4f484c/10 bg-bw-15 p-3"
                        >
                            <img
                                class="aspect-[655/373] w-full rounded-md bg-bw-25 object-cover"
                                :src="galleryImage.src"
                                :alt="galleryImage.alt"
                                :width="galleryImage.width"
                                :height="galleryImage.height"
                            >

                            <label class="mt-3 block">
                                <span class="text-sm text-4f484c/70">
                                    Картинка страницы {{ index + 1 }}
                                </span>
                                <input
                                    class="mt-2 block w-full text-sm text-4f484c file:mr-4 file:h-10 file:rounded-md file:border-0 file:bg-white file:px-4 file:text-sm file:font-bold file:text-4f484c"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    type="file"
                                    @change="uploadGalleryImage(index, $event)"
                                >
                            </label>
                        </div>
                    </div>
                </aside>

                <section class="rounded-lg border border-4f484c/10 bg-white p-5 lg:p-7">
                    <p class="text-t1 text-4f484c/60">#{{ project.id }}</p>
                    <h1
                        class="mt-4 font-neutral-face text-3xl leading-[112%] text-1c1a20 lg:text-5xl"
                    >
                        Редактирование проекта
                    </h1>

                    <div class="mt-8 grid gap-5">
                        <label class="block">
                            <span class="text-sm text-4f484c/70">Год</span>
                            <input
                                v-model.number="form.year"
                                class="mt-2 h-12 w-full rounded-md border border-4f484c/15 bg-white px-4 text-base outline-none transition focus:border-ffb9D1"
                                max="2200"
                                min="1900"
                                required
                                type="number"
                            >
                        </label>

                        <label class="block">
                            <span class="text-sm text-4f484c/70">Title</span>
                            <input
                                v-model="form.title"
                                class="mt-2 h-12 w-full rounded-md border border-4f484c/15 bg-white px-4 text-base outline-none transition focus:border-ffb9D1"
                                required
                                type="text"
                            >
                        </label>

                        <label class="block">
                            <span class="text-sm text-4f484c/70">Текст на главной</span>
                            <textarea
                                v-model="form.description"
                                class="mt-2 min-h-40 w-full resize-y rounded-md border border-4f484c/15 bg-white px-4 py-3 text-base outline-none transition focus:border-ffb9D1"
                                required
                            ></textarea>
                        </label>

                        <label class="block">
                            <span class="text-sm text-4f484c/70">Description 1</span>
                            <textarea
                                v-model="form.detailDescriptions[0]"
                                class="mt-2 min-h-32 w-full resize-y rounded-md border border-4f484c/15 bg-white px-4 py-3 text-base outline-none transition focus:border-ffb9D1"
                            ></textarea>
                        </label>

                        <label class="block">
                            <span class="text-sm text-4f484c/70">Description 2</span>
                            <textarea
                                v-model="form.detailDescriptions[1]"
                                class="mt-2 min-h-32 w-full resize-y rounded-md border border-4f484c/15 bg-white px-4 py-3 text-base outline-none transition focus:border-ffb9D1"
                            ></textarea>
                        </label>

                        <label class="block">
                            <span class="text-sm text-4f484c/70">Type</span>
                            <select
                                v-model="form.type"
                                class="mt-2 h-12 w-full rounded-md border border-4f484c/15 bg-white px-4 text-base outline-none transition focus:border-ffb9D1"
                                required
                            >
                                <option
                                    v-for="type in projectTypes"
                                    :key="type"
                                    :value="type"
                                >
                                    {{ type }}
                                </option>
                            </select>
                        </label>
                    </div>

                    <p
                        v-if="formMessage"
                        class="mt-5 rounded-md bg-bw-15 px-4 py-3 text-sm text-4f484c/70"
                    >
                        {{ formMessage }}
                    </p>

                    <button
                        class="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-4f484c px-5 text-base font-bold text-white transition hover:bg-4f484c/90 disabled:cursor-not-allowed disabled:opacity-60"
                        :disabled="isSaving"
                        type="submit"
                    >
                        {{ isSaving ? "Сохраняем..." : "Сохранить" }}
                    </button>
                </section>
            </form>
        </section>
    </main>
</template>

<script setup>
definePageMeta({
    layout: false,
});

const route = useRoute();
const projectTypes = ["Сайт", "Айдентика", "Фирменный стиль", "SMM"];
const { data: project, refresh } = await useFetch(`/api/admin/projects/${route.params.id}`);
const form = reactive({
    year: 2026,
    title: "",
    description: "",
    detailDescriptions: ["", ""],
    type: "Сайт",
});
const isSaving = ref(false);
const formMessage = ref("");
const imageMessage = ref("");

watchEffect(() => {
    if (!project.value) {
        return;
    }

    form.year = project.value.year;
    form.title = project.value.title;
    form.description = project.value.description;
    form.detailDescriptions = [
        project.value.detailDescriptions?.[0] ?? "",
        project.value.detailDescriptions?.[1] ?? "",
    ];
    form.type = project.value.type;
});

async function saveProject() {
    formMessage.value = "";
    isSaving.value = true;

    try {
        const updatedProject = await $fetch(`/api/admin/projects/${route.params.id}`, {
            method: "PATCH",
            body: form,
        });
        project.value = updatedProject;
        formMessage.value = "Проект сохранен";
    } catch {
        formMessage.value = "Не удалось сохранить проект";
    } finally {
        isSaving.value = false;
    }
}

async function uploadImage(event) {
    const input = event.target;
    const file = input.files?.[0];

    if (!file) {
        return;
    }

    imageMessage.value = "Загружаем картинку...";

    try {
        const body = new FormData();
        body.append("image", file);

        const updatedProject = await $fetch(
            `/api/admin/projects/${route.params.id}/image`,
            {
                method: "POST",
                body,
            },
        );
        project.value = updatedProject;
        await refresh();
        imageMessage.value = "Картинка обновлена";
    } catch {
        imageMessage.value = "Не удалось загрузить картинку";
    } finally {
        input.value = "";
    }
}

async function uploadGalleryImage(slot, event) {
    const input = event.target;
    const file = input.files?.[0];

    if (!file) {
        return;
    }

    imageMessage.value = `Загружаем картинку ${slot + 1}...`;

    try {
        const body = new FormData();
        body.append("image", file);

        const updatedProject = await $fetch(
            `/api/admin/projects/${route.params.id}/gallery/${slot}`,
            {
                method: "POST",
                body,
            },
        );
        project.value = updatedProject;
        await refresh();
        imageMessage.value = `Картинка ${slot + 1} обновлена`;
    } catch {
        imageMessage.value = `Не удалось загрузить картинку ${slot + 1}`;
    } finally {
        input.value = "";
    }
}
</script>
