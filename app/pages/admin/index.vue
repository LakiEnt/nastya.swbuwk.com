<template>
    <main class="min-h-screen bg-bw-15 text-4f484c">
        <header class="border-b border-4f484c/10 bg-white">
            <div
                class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10"
            >
                <NuxtLink
                    to="/"
                    class="font-neutral-face text-2xl leading-none text-4f484c"
                >
                    Admin
                </NuxtLink>

                <button
                    class="rounded-md border border-4f484c/15 px-4 py-2 text-sm transition hover:border-4f484c/35"
                    type="button"
                    @click="logout"
                >
                    Выйти
                </button>
            </div>
        </header>

        <section class="mx-auto max-w-7xl px-5 py-8 lg:px-10 lg:py-12">
            <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p class="text-t1 text-4f484c/60">
                        {{ session?.username ? `@${session.username}` : "Администратор" }}
                    </p>
                    <h1
                        class="mt-3 font-neutral-face text-4xl leading-[105%] lg:text-6xl"
                    >
                        Панель управления
                    </h1>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row">
                    <NuxtLink
                        to="/admin/about"
                        class="inline-flex h-11 items-center justify-center rounded-md border border-4f484c/15 bg-white px-5 text-base font-bold text-4f484c transition hover:border-4f484c/35"
                    >
                        Редактировать обо мне
                    </NuxtLink>

                    <NuxtLink
                        to="/admin/projects"
                        class="inline-flex h-11 items-center justify-center rounded-md bg-ffb9D1 px-5 text-base font-bold text-4f484c transition hover:bg-ffb9D1/80"
                    >
                        Управлять проектами
                    </NuxtLink>
                </div>
            </div>

            <div class="mt-10 grid gap-5 lg:grid-cols-3">
                <article class="rounded-lg border border-4f484c/10 bg-white p-5">
                    <p class="text-sm text-4f484c/60">Раздел</p>
                    <h2 class="mt-3 text-xl font-bold">Проекты</h2>
                    <p class="mt-3 text-t1 text-4f484c/70">
                        Место для будущего управления кейсами, описаниями и изображениями.
                    </p>
                </article>

                <article class="rounded-lg border border-4f484c/10 bg-white p-5">
                    <p class="text-sm text-4f484c/60">Раздел</p>
                    <h2 class="mt-3 text-xl font-bold">Обо мне</h2>
                    <p class="mt-3 text-t1 text-4f484c/70">
                        Редактирование заголовка, вступительного текста и блоков страницы.
                    </p>
                </article>

                <article class="rounded-lg border border-4f484c/10 bg-white p-5">
                    <p class="text-sm text-4f484c/60">Сессия</p>
                    <h2 class="mt-3 text-xl font-bold">Авторизация активна</h2>
                    <p class="mt-3 text-t1 text-4f484c/70">
                        Доступ защищен серверной cookie без отдельной базы данных.
                    </p>
                </article>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false,
});

const { data: session } = await useFetch("/api/admin/session");

async function logout() {
    await $fetch("/api/admin/logout", {
        method: "POST",
    });

    await navigateTo("/admin/login");
}
</script>
