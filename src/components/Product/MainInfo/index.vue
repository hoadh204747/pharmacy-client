<template>
    <div class="flex flex-col gap-6">
        <!-- Brand -->
        <div class="flex items-center gap-2">
            <span class="text-gray-600 text-xs font-medium">Thương hiệu:</span>
            <span class="text-purple-600 font-semibold text-sm">{{ product.brand?.name }}</span>
        </div>

        <!-- Product Name -->
        <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {{ product.name }}
            </h1>
        </div>

        <!-- Product Stats -->
        <div class="flex flex-wrap items-center gap-4 pb-4 border-b border-gray-200">
            <div class="flex items-center gap-1">
                <i class="pi pi-shopping-bag text-purple-600 text-sm"></i>
                <span class="text-xs text-gray-700">Đã bán <span class="font-semibold">{{ product.sold }}</span></span>
            </div>
            <div class="flex items-center gap-1">
                <i class="pi pi-comment text-purple-600 text-sm"></i>
                <span class="text-xs text-gray-700"><span class="font-semibold">20</span> đánh giá</span>
            </div>
            <div class="flex items-center gap-1">
                <i class="pi pi-star-fill text-amber-400 text-sm"></i>
                <span class="text-xs text-gray-700"><span class="font-semibold">4.5</span> / 5</span>
            </div>
        </div>

        <!-- Price Section -->
        <div class="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-xl border-2 border-red-100">
            <div class="flex items-end gap-4 mb-2">
                <span class="text-3xl md:text-4xl font-bold text-red-600">
                    {{ formatPrice(discountedPrice) }}
                </span>
                <span class="text-lg text-gray-400 line-through mb-1">
                    {{ formatPrice(product.price) }}
                </span>
            </div>
            <div class="flex items-center gap-3">
                <span class="bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    -{{ product.discount }}%
                </span>
                <span class="text-gray-600 text-xs">
                    Tiết kiệm <span class="font-bold text-red-600">{{ formatPrice(discountAmount) }}đ</span>
                </span>
            </div>
        </div>

        <!-- Stock Status -->
        <div class="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <i class="pi pi-check-circle text-green-600 text-lg"></i>
            <div>
                <p class="font-semibold text-green-800 text-sm">Còn {{ product.amount }} sản phẩm</p>
                <p class="text-xs text-green-700">Giao hàng nhanh trong 2h</p>
            </div>
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

function formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN').format(price);
}
</script>

<style scoped></style>