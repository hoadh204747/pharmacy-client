<template>
    <div class="py-6 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
                <h4 class="text-xl font-bold text-gray-800">Product Category</h4>
                <a href="/products/category" class="text-sm text-blue-600 hover:underline">View more</a>
            </div>

            <!-- Carousel -->
            <Carousel :value="props.data" :numVisible="numVisible" :numScroll="numScroll"
                :responsiveOptions="responsiveOptions">
                <template #item="slotProps">
                    <ProductCard :data="slotProps.data" />
                </template>
            </Carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import ProductCard from '@/components/ProductCard/ProductCard.vue';
import { ref } from 'vue';
import type { IGetProductResponse } from '@/api/models/product';

const props = defineProps<{
    data: IGetProductResponse[];
}>();

const numVisible = 5;
const numScroll = 3;
const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 5,
        numScroll: 2,
    },
    {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 2,
    },
    {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '640px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1,
    },
];
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
