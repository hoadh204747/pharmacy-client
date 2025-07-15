<template>
    <div
        class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all m-2 p-3 border border-gray-200 flex flex-col items-center h-full">
        <!-- Image -->
        <div class="w-28 h-28 sm:w-32 sm:h-32 overflow-hidden rounded-md">
            <img class="object-cover w-full h-full transition-transform group-hover:scale-105"
                :src="data.image" alt="Product" />
        </div>

        <!-- Info -->
        <div class="mt-3 w-full text-center flex-1 flex flex-col justify-between">
            <p class="text-sm font-semibold text-gray-800 line-clamp-2 h-10" v-tooltip="data.name">
                {{ data.name }}
            </p>

            <div class="text-sm text-gray-600 mt-1 space-y-0.5">
                <p>Price: 100.000đ</p>
                <p>Sale: 10%</p>
            </div>

            <!-- Actions -->
            <div class="flex justify-between items-center mt-3 px-4 text-sm">
                <div class="flex items-center gap-1 text-green-600">
                    <CheckOutlined />
                    <span>Ready</span>
                </div>
                <div class="text-gray-600 hover:text-green-600 cursor-pointer" title="Add to cart">
                    <div v-tooltip="'Add to cart'" class="cursor-pointer text-gray-600 hover:text-green-600">
                        <ShoppingCartOutlined />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CheckOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';

const props = defineProps<{
    data: {
        name: string;
        image: string;
    };
}>();
</script>

<style scoped></style>