<template>
    <main class="container">
        <section class="mt-13.75 lg:mt-15 flex flex-col h-[75vh]">
            <header class="flex justify-between">
                <h1
                    class="font-neutral-face text-4xl lg:text-7xl text-left leading-[105%] w-full"
                >
                    немного
                    <span class="text-ffb9D1 leading-[126%]">обо мне</span>
                </h1>
                <picture>
                    <source srcset="/images/front3.png" type="image/webp" />
                    <img
                        class=""
                        src="/images/front3.png"
                        width="272"
                        height="380"
                        alt="Настя Сергеева"
                    />
                </picture>
            </header>

            <div class="max-w-xl space-y-4 mt-8 lg:mt-auto">
                <p class="text-4f484c text-20 leading-6">
                    Меня зовут Настя. Я занимаюсь дизайном 3 года. Мой опыт —
                    это работа с абсолютно разными клиентами: от локальных
                    стартапов до крупных компаний
                </p>
                <p class="text-4f484c text-20 leading-6">
                    Я умею переключаться между задачами: создаю целостные
                    бренд-системы, удобные и современные сайты,
                    а также привлекательный контент для социальных сетей
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
                БУДУ РАДА ПООБЩАТЬСЯ

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
const aboutMeList = [
    {
        title: "Образование",
        description:
            "Моё формальное образование началось в Уральском колледже прикладного искусства и дизайна, где я изучала графический дизайн. Это дало мне крепкую теоретическую базу и понимание фундаментальных принципов",
    },
    {
        title: "графический дизайн",
        description:
       "Сотрудничество с Центром развития туризма города Нижний Тагил: разработка дизайна для туристических направлений, работа с региональной айдентикой и поиск визуальных образов, которые цепляют разную аудиторию",
    },
    {
        title: "ОПЫТ РАБОТЫ",
        description:
            "В студии Евгения Батюкова я научилась работать с крупными, комплексными проектами: выстраивать логичную структуру, проектировать интуитивные пользовательские сценарии и создавать визуал, который работает на бизнес-цели",
    },
    {
        title: "жизнь",
        description:
            "В свободное время люблю рисовать для души, открывать для себя неочевидные грани дизайна в путешествиях, кино и играх. Верю, что вдохновение и свежий взгляд можно найти где угодно.",
    },
];
</script>
