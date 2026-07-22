<template>
    <footer class="container lg:py-5 space-y-5">
        <div class="flex justify-between">
            <nav class="flex space-x-10">
                <BaseLink to="/projects" label="Проекты" />
                <BaseLink to="#" label="Резюме" />
            </nav>
            <ul class="flex items-center space-x-5">
                <li>
                    <a
                        href="https://t.me/sergeeva_anastasiiia"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                        class="inline-flex size-8 items-center justify-center text-4f484c transition-colors duration-300 hover:text-ffb9D1"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-6"
                        >
                            <path
                                d="M21.94 4.16a1.45 1.45 0 0 0-1.52-.24L3.42 10.48a1.37 1.37 0 0 0 .08 2.59l4.32 1.34 1.67 5.18a1.39 1.39 0 0 0 2.42.45l2.32-2.87 4.25 3.11a1.49 1.49 0 0 0 2.35-.9l1.6-13.79a1.45 1.45 0 0 0-.49-1.43ZM19.4 6.75l-8.6 7.61a.75.75 0 0 0-.24.45l-.34 2.69-.92-2.86a.74.74 0 0 0-.49-.48l-2.58-.8 13.17-5.08Z"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="mailto:sergbeu18@gmail.com"
                        aria-label="E-mail"
                        class="inline-flex size-8 items-center justify-center text-4f484c transition-colors duration-300 hover:text-ffb9D1"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-6"
                        >
                            <path
                                d="M4 6.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Z"
                            />
                            <path d="m3 8 9 6 9-6" />
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
        <div class="flex justify-between text-a99ba4 text-t1 lg:text-xl">
            <p>(Спасибо за просмотр!)</p>
            <p>
                © 2026
                <!-- Anastasia Sergeeva. All rights reserved. -->
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts">
import BaseLink from "./ui/BaseLink.vue";
</script>
