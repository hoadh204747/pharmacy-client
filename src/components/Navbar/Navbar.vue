<template>
    <div class="navbar-container">
        <nav class="px-2 py-0 w-full">
            <div class="max-w-6xl mx-auto flex items-center justify-between h-14">
                <ul class="flex space-x-8 h-full">
                    <li v-for="category in props.categories" :key="category.id" class="flex items-center group">
                        <router-link :to="`/${category.id}/products`"
                            class="text-gray-700 font-semibold hover:text-purple-600 transition-colors duration-200 py-4 border-b-2 border-transparent group-hover:border-purple-600">
                            {{ category.name }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import type { IGetCategoryResponse } from '@/api/models/category'

const props = defineProps<{
    categories?: Array<IGetCategoryResponse>
}>()
</script>

<style scoped>
.navbar-container {
    width: 100%;
    background: linear-gradient(to right, #f8f9fa 0%, #f3f4f6 100%);
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
    .navbar-container nav {
        overflow-x: auto;
    }

    .navbar-container ul {
        gap: 1rem;
        /* space-x-4 = gap: 1rem */
    }
}
</style>
