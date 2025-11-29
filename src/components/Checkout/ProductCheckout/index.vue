<template>
    <div class="flex items-center gap-4 py-3 border-b border-gray-100">
        <div
            class="w-17 h-17 rounded-lg border border-gray-200 bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
            <a :href="link">
                <img :src="image" alt="" loading="lazy" :srcset="srcset" class="w-full h-full object-cover" />
            </a>
        </div>
        <div class="flex-1 flex items-center min-w-0">
            <a :href="link" class="font-semibold text-base text-gray-900 flex-1 min-w-0 truncate">
                {{ name }}
            </a>
            <span class="ml-4 text-sm font-medium text-gray-700 whitespace-nowrap text-right w-12">
                x{{ quantity }}
            </span>
            <span class="ml-4 text-sm font-bold text-red-500 whitespace-nowrap text-right w-20">
                {{ total }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string;
    image: string;
    link: string;
    price: string;
    quantity: number;
    total: string;
    srcset?: string;
}>();
</script>

<style scoped></style>