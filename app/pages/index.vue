<template>
    <main class="container">
        <section class="relative mt-13.75 lg:mt-15">
            <h1
                class="font-neutral-face text-4xl lg:text-7xl text-right leading-[105%] lg:absolute w-full top-0"
            >
                Настя сергеева <br />
                <span class="text-ffb9D1 leading-[126%]"
                    >Гибридный <br />
                    дизайнер</span
                >
            </h1>

            <div
                class="flex max-lg:flex-col space-x-5 mt-13.75 lg:pt-37.5 relative"
            >
                <picture>
                    <source srcset="/images/front.png" type="image/webp" />
                    <img
                        class="max-lg:max-w-37.5"
                        src="/images/front.png"
                        width="345"
                        height="484"
                        alt="Настя Сергеева"
                    />
                </picture>
                <div class="flex flex-col justify-between">
                    <picture>
                        <source srcset="/images/front2.png" type="image/webp" />
                        <img
                            class="max-lg:max-w-13 max-lg:absolute top-0 right-1/3"
                            src="/images/front2.png"
                            width="116"
                            height="162"
                            alt="Настя Сергеева"
                        />
                    </picture>
                    <p
                        class="max-w-60 max-lg:mt-4.5 lg:max-w-105 text-t1 lg:text-xl w-full"
                    >
                        Делаю дизайн полезным и&nbsp;понятным. Создаю цельный
                        образ проекта&nbsp;&mdash; от&nbsp;графики
                        до&nbsp;взаимодействия на&nbsp;сайте
                    </p>
                </div>
            </div>
        </section>

        <section class="relative mt-18.75 lg:mt-32.5">
            <H2Title label="Проекты" />
            <div class="flex flex-col space-y-8 lg:space-y-10 mt-8 lg:mt-15">
                <ProjectCard
                    v-for="project in filteredProjects"
                    :key="project.title"
                    :project="project"
                />
            </div>
        </section>

        <section class="container h-[90vh] flex justify-center items-center">
            <NuxtLink
                to="/projects"
                class="text-3xl lg:text-6xl font-neutral-face text-4f484c inline-flex max-lg:flex-col items-center"
            >
                а еще я могу...
                <svg
                    class="lg:ml-10 max-lg:w-16"
                    width="136"
                    height="72"
                    viewBox="0 0 136 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 35.72H131M131 35.72L86.7975 2.39551M131 35.72L86.7975 69.4602"
                        stroke="#FFB9D1"
                        stroke-width="6"
                    />
                </svg>
            </NuxtLink>
        </section>
    </main>
</template>

<script lang="ts" setup>
import H2Title from "@/components/ui/H2Title.vue";
import ProjectCard from "@/components/ui/ProjectCard.vue";

const { data: projects } = await useFetch("/api/projects", {
    default: () => [],
});
const filter = ["Айдентика", "Фирменный стиль"];
const filteredProjects = computed(() => {
    return projects.value.filter((project) => !filter.includes(project.type));
});
</script>
