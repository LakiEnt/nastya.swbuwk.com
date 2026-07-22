<template>
    <main
        class="min-h-screen bg-bw-15 px-5 py-8 text-4f484c lg:px-10 lg:py-12"
    >
        <div class="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center">
            <section class="grid w-full gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
                <div class="max-w-2xl">
                    <NuxtLink
                        to="/"
                        class="text-t1 text-4f484c/70 transition hover:text-4f484c"
                    >
                        Вернуться на сайт
                    </NuxtLink>
                    <h1
                        class="mt-10 font-neutral-face text-4xl leading-[105%] text-4f484c lg:text-7xl"
                    >
                        Вход в админ панель
                    </h1>
                    <p class="mt-6 max-w-xl text-t1 lg:text-xl">
                        Закрытый раздел для управления содержимым портфолио.
                    </p>
                </div>

                <form
                    class="rounded-lg border border-4f484c/10 bg-white p-5 shadow-[0_20px_70px_rgba(79,72,76,0.08)] lg:p-7"
                    @submit.prevent="login"
                >
                    <label class="block">
                        <span class="text-sm text-4f484c/70">Логин</span>
                        <input
                            v-model="username"
                            autocomplete="username"
                            class="mt-2 h-12 w-full rounded-md border border-4f484c/15 bg-white px-4 text-base outline-none transition focus:border-ffb9D1"
                            name="username"
                            required
                            type="text"
                        >
                    </label>

                    <label class="mt-5 block">
                        <span class="text-sm text-4f484c/70">Пароль</span>
                        <input
                            v-model="password"
                            autocomplete="current-password"
                            class="mt-2 h-12 w-full rounded-md border border-4f484c/15 bg-white px-4 text-base outline-none transition focus:border-ffb9D1"
                            name="password"
                            required
                            type="password"
                        >
                    </label>

                    <p
                        v-if="errorMessage"
                        class="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {{ errorMessage }}
                    </p>

                    <button
                        class="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-4f484c px-5 text-base font-bold text-white transition hover:bg-4f484c/90 disabled:cursor-not-allowed disabled:opacity-60"
                        :disabled="isLoading"
                        type="submit"
                    >
                        {{ isLoading ? "Входим..." : "Войти" }}
                    </button>
                </form>
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false,
});

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

async function login() {
    errorMessage.value = "";
    isLoading.value = true;

    try {
        await $fetch("/api/admin/login", {
            method: "POST",
            body: {
                username: username.value,
                password: password.value,
            },
        });

        await navigateTo("/admin");
    } catch {
        errorMessage.value = "Неверный логин или пароль";
    } finally {
        isLoading.value = false;
    }
}
</script>
