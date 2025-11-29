<template>
    <div class="flex flex-col gap-4">
        <div>
            <span class="text-xl">Thương hiệu: {{ product.brand?.name }}</span>
            <span class="text-xl text-green-600">{{ }}</span>
        </div>
        <div>
            <h1 class="text-2xl font-bold text-[#020b27]">{{ product.name }}</h1>
        </div>
        <div class="flex items-center gap-3">
            <span>Đã bán {{ product.sold }}</span>
            <span>{{ 20 }} đánh giá</span>
            <span>{{ 10 }} bình luận</span>
            <span>{{ 5 }} <i class="pi pi-star-fill text-amber-300"></i></span>
        </div>
        <div class="flex items-center gap-3">
            <span class="px-1 text-white bg-red-500 rounded">Giảm {{ discountAmount }}₫</span>
            <span class="text-xl line-through px-1 bg-[#ccc] font-extrabold">{{ product.price }}</span>
        </div>
        <div>
            <span class="text-3xl font-bold text-green-500">{{ discountedPrice }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IGetBrandResponse } from '@/api/models/brand';
import { computed } from 'vue';

const props = defineProps<{
    product: {
        id: number
        name: string
        slug: string
        description: string
        imageUrl: string[]
        price: number
        discount: number
        amount: number
        sold: number
        sale: boolean
        brand: IGetBrandResponse,
        createdAt: string
        updatedAt: string
    };
}>();

const discountAmount = computed(() => {
    return (props.product.price * props.product.discount) / 100;
});
const discountedPrice = computed(() => {
    return props.product.price - discountAmount.value;
});
</script>

<style scoped></style>