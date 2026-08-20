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
                    В админку
                </NuxtLink>
            </div>
        </header>

        <section class="mx-auto max-w-7xl px-5 py-8 lg:px-10 lg:py-12">
            <form
                class="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start"
                @submit.prevent="saveAbout"
            >
                <aside class="rounded-lg border border-4f484c/10 bg-white p-5">
                    <img
                        class="w-full rounded-md bg-bw-25 object-cover"
                        :src="about?.image.src"
                        :alt="about?.image.alt"
                        :width="about?.image.width"
                        :height="about?.image.height"
                    >

                    <p class="mt-4 text-sm text-4f484c/60">
                        Изображение страницы пока хранится в файле контента.
                    </p>
                </aside>

                <section class="rounded-lg border border-4f484c/10 bg-white p-5 lg:p-7">
                    <p class="text-t1 text-4f484c/60">Страница</p>
                    <h1
                        class="mt-4 font-neutral-face text-3xl leading-[112%] text-1c1a20 lg:text-5xl"
                    >
                        Обо мне
                    </h1>

                    <div class="mt-8 grid gap-5">
                        <div class="grid gap-5 lg:grid-cols-2">
                            <label class="block">
                                <span class="text-sm text-4f484c/70">Заголовок</span>
                                <input
                                    v-model="form.titlePrefix"
                                    class="mt-2 h-12 w-full rounded-md border border-4f484c/15 bg-white px-4 text-base outline-none transition focus:border-ffb9D1"
                                    required
                                    type="text"
                                >
                            </label>

                            <label class="block">
                                <span class="text-sm text-4f484c/70">Акцент заголовка</span>
                                <input
                                    v-model="form.titleAccent"
                                    class="mt-2 h-12 w-full rounded-md border border-4f484c/15 bg-white px-4 text-base outline-none transition focus:border-ffb9D1"
                                    required
                                    type="text"
                                >
                            </label>
                        </div>

                        <label class="block">
                            <span class="text-sm text-4f484c/70">Вступительный текст 1</span>
                            <textarea
                                v-model="form.intro[0]"
                                class="mt-2 min-h-32 w-full resize-y rounded-md border border-4f484c/15 bg-white px-4 py-3 text-base outline-none transition focus:border-ffb9D1"
                                required
                            ></textarea>
                        </label>

                        <label class="block">
                            <span class="text-sm text-4f484c/70">Вступительный текст 2</span>
                            <textarea
                                v-model="form.intro[1]"
                                class="mt-2 min-h-32 w-full resize-y rounded-md border border-4f484c/15 bg-white px-4 py-3 text-base outline-none transition focus:border-ffb9D1"
                                required
                            ></textarea>
                        </label>

                        <div class="grid gap-4">
                            <div class="flex items-center justify-between gap-4">
                                <h2 class="text-xl font-bold text-1c1a20">Блоки</h2>

                                <button
                                    class="h-10 rounded-md border border-4f484c/15 px-4 text-sm transition hover:border-4f484c/35"
                                    type="button"
                                    @click="addItem"
                                >
                                    Добавить блок
                                </button>
                            </div>

                            <article
                                v-for="(item, index) in form.items"
                                :key="index"
                                class="rounded-md border border-4f484c/10 bg-bw-15 p-4"
                            >
                                <div class="flex items-center justify-between gap-4">
                                    <p class="text-sm text-4f484c/60">
                                        Блок {{ index + 1 }}
                                    </p>

                                    <button
                                        class="h-9 rounded-md border border-red-200 px-3 text-sm text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                        :disabled="form.items.length === 1"
                                        type="button"
                                        @click="removeItem(index)"
                                    >
                                        Удалить
                                    </button>
                                </div>

                                <label class="mt-4 block">
                                    <span class="text-sm text-4f484c/70">Название</span>
                                    <input
                                        v-model="item.title"
                                        class="mt-2 h-12 w-full rounded-md border border-4f484c/15 bg-white px-4 text-base outline-none transition focus:border-ffb9D1"
                                        required
                                        type="text"
                                    >
                                </label>

                                <label class="mt-4 block">
                                    <span class="text-sm text-4f484c/70">Описание</span>
                                    <textarea
                                        v-model="item.description"
                                        class="mt-2 min-h-32 w-full resize-y rounded-md border border-4f484c/15 bg-white px-4 py-3 text-base outline-none transition focus:border-ffb9D1"
                                        required
                                    ></textarea>
                                </label>
                            </article>
                        </div>

                        <label class="block">
                            <span class="text-sm text-4f484c/70">Финальный текст</span>
                            <input
                                v-model="form.contactText"
                                class="mt-2 h-12 w-full rounded-md border border-4f484c/15 bg-white px-4 text-base outline-none transition focus:border-ffb9D1"
                                required
                                type="text"
                            >
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

<script setup lang="ts">
definePageMeta({
    layout: false,
});

interface AboutItem {
    title: string;
    description: string;
}

const { data: about, refresh } = await useFetch("/api/admin/about");
const form = reactive({
    titlePrefix: "",
    titleAccent: "",
    intro: ["", ""],
    items: [] as AboutItem[],
    contactText: "",
});
const isSaving = ref(false);
const formMessage = ref("");

watchEffect(() => {
    if (!about.value) {
        return;
    }

    form.titlePrefix = about.value.titlePrefix;
    form.titleAccent = about.value.titleAccent;
    form.intro = [
        about.value.intro?.[0] ?? "",
        about.value.intro?.[1] ?? "",
    ];
    form.items = about.value.items.map((item) => ({ ...item }));
    form.contactText = about.value.contactText;
});

function addItem() {
    form.items.push({
        title: "Новый блок",
        description: "",
    });
}

function removeItem(index: number) {
    if (form.items.length === 1) {
        return;
    }

    form.items.splice(index, 1);
}

async function saveAbout() {
    formMessage.value = "";
    isSaving.value = true;

    try {
        const updatedAbout = await $fetch("/api/admin/about", {
            method: "PATCH",
            body: form,
        });
        about.value = updatedAbout;
        await refresh();
        formMessage.value = "Страница сохранена";
    } catch {
        formMessage.value = "Не удалось сохранить страницу";
    } finally {
        isSaving.value = false;
    }
}
</script>
