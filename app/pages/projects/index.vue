<template>
    <main class="container">
        <section class="relative mt-13.75 lg:mt-15 flex flex-col">
            <p class="text-[12px] lg:text-20 text-4f484c">А еще я могу...</p>
            <h1
                class="font-neutral-face text-4xl lg:text-7xl text-left leading-[105%] w-full mt-2 lg:mt-3"
            >
                проиллюс&shy;трировать <br />
                <span class="text-ffb9D1 leading-[126%]">Вашу идею </span>
            </h1>

            <!-- <picture> -->
            <!-- <source srcset="/images/projects.png" type="image/webp" /> -->
            <Transition name="idea-image" mode="out-in">
                <img
                    :key="ideaImageSrc"
                    class="relative max-lg:mt-18 w-full h-auto mx-auto -mt-35 max-w-220 rotate-3 cursor-pointer"
                    :src="ideaImageSrc"
                    width="877"
                    height="549"
                    alt="Настя Сергеева"
                    @click="nextIdeaImage"
                />
            </Transition>
            <!-- </picture> -->
            <div class="absolute space-y-3 top-1/2">
                <p class="text-1c1a20 text-sm lg:text-20">Переключить стиль</p>

                <svg
                    class="lg:ml-25"
                    width="71"
                    height="44"
                    viewBox="0 0 71 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 1.00012C1.5082 4.30215 2.35861 8.56951 2.8285 10.2716C3.42052 12.4161 3.97769 13.9324 4.95451 16.2283C5.8989 18.4479 6.86857 20.5722 8.22844 22.5693C11.5073 27.3845 15.2092 30.108 16.993 31.5522C21.4585 35.1674 24.5662 35.4709 28.0151 36.2396C30.1394 36.7131 33.1571 37.0083 37.2827 37.2203C42.9716 37.5125 47.6395 37.0951 49.5498 36.6712C53.1493 35.8724 55.1297 34.9704 58.4471 34.2017C61.6488 33.4598 64.7523 31.4768 66.2884 30.3736C68.3226 28.9127 60.937 29.0099 59.106 28.5821C56.8665 28.059 55.1502 27.6462 52.1303 26.7115C50.6196 26.2439 49.4399 26.4536 49.0977 26.3259C48.0599 25.9386 52.2338 26.9618 54.7441 27.5989C59.7102 28.8594 64.0475 28.8311 68.6634 29.3866C70.4959 29.6071 67.0661 34.2604 64.5978 39.4178C64.0807 40.3257 63.8279 40.5785 63.6134 40.9194C63.3989 41.2603 63.2303 41.6817 63.0566 42.1158"
                        stroke="#FFB9D1"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                </svg>
            </div>
            <p
                class="lg:absolute text-[1rem] text-4f484c lg:text-xl max-lg:self-star text-left lg:text-right max-w-90 -bottom-10 right-0"
            >
                Я не боюсь, что нейросеть меня заменит, потому что клиенту нужен
                не генератор, а человек, который возьмет на себя эстетику и
                смыслы
            </p>
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

        <section class="h-[80vh] flex justify-center items-center">
            <NuxtLink
                to="/about"
                class="text-3xl lg:text-6xl font-neutral-face text-4f484c inline-flex max-lg:flex-col items-center"
            >
                но вообще я...
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
import { computed, ref } from "vue";
import H2Title from "@/components/ui/H2Title.vue";
import ProjectCard from "@/components/ui/ProjectCard.vue";

const ideaImages = [
    "/images/ideas/0.png",
    "/images/ideas/1.png",
    "/images/ideas/2.png",
];
const ideaImageIndex = ref(0);
const ideaImageSrc = computed(() => ideaImages[ideaImageIndex.value]);

const nextIdeaImage = () => {
    ideaImageIndex.value = (ideaImageIndex.value + 1) % ideaImages.length;
};

const { data: projects } = await useFetch("/api/projects", {
    default: () => [],
});
const filter = ["Айдентика", "Фирменный стиль"];
const filteredProjects = computed(() => {
    return projects.value.filter((project) => filter.includes(project.type));
});
</script>

<style scoped>
.idea-image-enter-active,
.idea-image-leave-active {
    transition: opacity 300ms ease;
}

.idea-image-enter-from,
.idea-image-leave-to {
    opacity: 0;
}
</style>
