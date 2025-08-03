<template>
    <div class="flex flex-col gap-4">
        <div>
            <span class="text-xl">Thương hiệu: </span>
            <span class="text-xl text-green-600">{{ product.brand }}</span>
        </div>
        <div>
            <h1 class="text-2xl font-bold text-[#020b27]">{{ product.name }}</h1>
        </div>
        <div class="flex items-center gap-3">
            <span>Đã bán {{ product.sold }}</span>
            <span>{{ product.reviews }} đánh giá</span>
            <span>{{ product.comments }} bình luận</span>
            <span>{{ product.rating }} <i class="pi pi-star-fill text-amber-300"></i></span>
        </div>
        <div class="flex items-center gap-3">
            <span class="px-1 text-white bg-red-500 rounded">Giảm 96.000 ₫</span>
            <span class="text-xl line-through px-1 bg-[#ccc] font-extrabold">{{ product.originalPrice }}</span>
        </div>
        <div>
            <span class="text-3xl font-bold text-green-500">{{ product.discountPrice }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    product: {
        brand: string;
        name: string;
        sold: number;
        reviews: number;
        comments: number;
        rating: number;
        originalPrice: string;
        discountPrice: string;
    };
}>();
</script>

<style scoped></style>