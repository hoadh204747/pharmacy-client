<template>
    <div @click="() => router.push({ name: 'product-detail', params: { id: data.id } })"
        class="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer hover:border-purple-300">

        <!-- Image Container -->
        <div class="relative w-full aspect-square overflow-hidden bg-gray-50">
            <img class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                :src="data.imageUrl[0]" alt="Product" />

            <!-- Sale Badge -->
            <div v-if="data.discount > 0"
                class="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                -{{ data.discount }}%
            </div>

            <!-- Stock Status -->
            <div
                class="absolute bottom-3 left-3 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                <i class="pi pi-check text-sm"></i>
                <span>Có sẵn</span>
            </div>
        </div>

        <!-- Content -->
        <div class="p-4 flex-1 flex flex-col justify-between">
            <!-- Product Name -->
            <div>
                <a-tooltip>
                    <template #title>
                        {{ data.name }}
                    </template>
                    <h3
                        class="text-sm font-semibold text-gray-800 line-clamp-2 h-10 group-hover:text-purple-600 transition">
                        {{ data.name }}
                    </h3>
                </a-tooltip>
            </div>

            <!-- Price Section -->
            <div class="mt-3 mb-4">
                <div class="flex items-baseline gap-2">
                    <span class="text-lg font-bold text-red-600">
                        {{ formatPrice(data.price - (data.price * data.discount / 100)) }} đ
                    </span>
                    <span v-if="data.discount > 0" class="text-sm text-gray-400 line-through">
                        {{ formatPrice(data.price) }} đ
                    </span>
                </div>
            </div>

            <!-- Add to Cart Button -->
            <button @click.stop="addToCart"
                class="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <i class="pi pi-shopping-cart text-sm"></i>
                <span>Thêm vào giỏ</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import router from '@/router';

const props = defineProps<{
    data: {
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
        createdAt: string
        updatedAt: string
    };
}>();

const emit = defineEmits(['add-to-cart']);

function formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN').format(price);
}

function addToCart() {
    emit('add-to-cart', {
        id: props.data.id,
        name: props.data.name,
        price: props.data.price,
        discount: props.data.discount,
        image: props.data.imageUrl[0]
    });
    message.success('Đã thêm vào giỏ hàng');
}
</script>

<style scoped></style>