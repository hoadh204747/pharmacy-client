<template>
    <div class="py-3 mt-2 w-6xl mr-auto ml-auto">
        <Carousel :value="items" :numVisible="6" :numScroll="3">
            <template #item="slotProps">
                <!-- Nội dung từng item -->
                <div class="flex flex-col items-center justify-center gap-2">
                    <div class="px-2 py-1 bg-green-100 rounded-sm">
                        <img class="w-10 h-10 object-cover" :src="slotProps.data.image" alt="Item Image">
                    </div>
                    <span>{{ slotProps.data.name }}</span>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';
const alarm_clock = new URL('../../assets/alarm-clock.png', import.meta.url).href;

const items: { name: string, image: string }[] = [
    { name: 'Item 1', image: alarm_clock },
    { name: 'Item 2', image: alarm_clock },
    { name: 'Item 3', image: alarm_clock },
    { name: 'Item 4', image: alarm_clock },
    { name: 'Item 5', image: alarm_clock },
    { name: 'Item 6', image: alarm_clock },
    { name: 'Item 1', image: alarm_clock },
    { name: 'Item 2', image: alarm_clock },
    { name: 'Item 3', image: alarm_clock },
    { name: 'Item 4', image: alarm_clock },
    { name: 'Item 5', image: alarm_clock },
    { name: 'Item 6', image: alarm_clock }
];
</script>

<style scoped></style>