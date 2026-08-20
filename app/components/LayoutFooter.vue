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
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="44" height="44" fill="#F1F1F2" />
                            <path
                                d="M12.5 13H32.5C35 13 35 13 35 15.5V30.5C35 33 35 33 32.5 33H12.5C10 33 10 33 10 30.5V15.5C10 13 10 13 12.5 13Z"
                                fill="#4F474C"
                            />
                            <path
                                d="M35 15.5L22.5 24.25L10 15.5"
                                fill="#4F474C"
                            />
                            <path
                                d="M35 15.5C35 13 35 13 32.5 13H12.5C10 13 10 13 10 15.5M35 15.5V30.5C35 33 35 33 32.5 33H12.5C10 33 10 33 10 30.5V15.5M35 15.5L22.5 24.25L10 15.5"
                                stroke="#F1F1F2"
                                stroke-width="2"
                                stroke-linecap="round"
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
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="44" height="44" fill="#F1F1F2" />
                            <path
                                d="M9.61718 20.5976C17.0023 17.3452 26.5593 13.3798 27.8785 12.831C31.339 11.3945 32.4008 11.6698 31.8714 14.8511C31.4912 17.1376 30.3941 24.7077 29.5197 29.4196C29.0009 32.2138 27.8368 32.545 26.0064 31.3361C25.1261 30.7543 20.6832 27.8131 19.7189 27.1225C18.8386 26.4931 17.6246 25.736 19.1471 24.2448C19.6889 23.7136 23.2405 20.3188 26.0076 17.6764C26.3701 17.3293 25.9147 16.7593 25.4963 17.0376C21.7667 19.5135 16.5957 22.9501 15.9376 23.3977C14.9433 24.0736 13.9885 24.3836 12.2744 23.8907C10.9793 23.5183 9.71414 23.0742 9.22172 22.9048C7.32548 22.253 7.77559 21.4088 9.61718 20.5976Z"
                                fill="#4F474C"
                            />
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
