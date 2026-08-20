<template>
    <main class="container">
        <section class="mt-13.75 lg:mt-15 flex flex-col h-[75vh]">
            <header class="flex justify-between">
                <h1
                    class="font-neutral-face text-4xl lg:text-7xl text-left leading-[105%] w-full"
                >
                    {{ about.titlePrefix }}
                    <span class="text-ffb9D1 leading-[126%]">{{ about.titleAccent }}</span>
                </h1>
                <picture>
                    <source :srcset="about.image.webp" type="image/webp" />
                    <img
                        class=""
                        :src="about.image.src"
                        :width="about.image.width"
                        :height="about.image.height"
                        :alt="about.image.alt"
                    />
                </picture>
            </header>

            <div class="max-w-xl space-y-4 mt-8 lg:mt-auto">
                <p
                    v-for="(paragraph, index) in about.intro"
                    :key="index"
                    class="text-4f484c text-20 leading-6"
                >
                    {{ paragraph }}
                </p>
            </div>
        </section>

        <section class="mt-22.5  grid grid-cols-2 gap-y-20 gap-x-40">
            <div
                v-for="item in aboutMeList"
                :key="item.title"
                class="flex max-lg:flex-col space-x-8"
            >
                <article
                    class="flex flex-col space-y-8 justify-center"
                >
                    <h2 class="font-neutral-face text-3xl">
                        {{ item.title }}
                    </h2>
                    <p
                        class="text-t2 lg:text-20 text-4f484c max-w-148"
                    >
                        {{ item.description }}
                    </p>
                </article>
            </div>
        </section>

        <section class="h-screen flex justify-center items-center">
            <p class="text-[4rem] relative text-4f484c">
                {{ about.contactText }}

                <img
                    class="absolute -right-12 -bottom-4.5"
                    src="/images/star-big.png"
                    width="50"
                    height="48"
                    alt=""
                />
                <img
                    class="absolute -left-10 -top-2"
                    src="/images/star-medium.png"
                    width="38"
                    height="38"
                    alt=""
                />
                <img
                    class="absolute -top-6"
                    src="/images/star-small.png"
                    width="20"
                    height="21"
                    alt=""
                />
            </p>
        </section>
    </main>
</template>

<script setup lang="ts">
const { data: about } = await useFetch("/api/about", {
    default: () => ({
        titlePrefix: "",
        titleAccent: "",
        image: {
            src: "",
            webp: "",
            width: 272,
            height: 380,
            alt: "",
        },
        intro: ["", ""],
        items: [],
        contactText: "",
    }),
});

const aboutMeList = computed(() => about.value.items);
</script>
