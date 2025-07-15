<template>
    <div class="products-wrapper">
        <div class="filter">
            <Filter />
        </div>
        <div class="products">
            <div v-for="item in items" class="product">
                <ProductCard :data="item"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Filter from '@/components/Filter/Filter.vue';
import ProductCard from '@/components/ProductCard/ProductCard.vue';

const items = Array.from({ length: 12 }).map((_, i) => ({
    name: `Item ${i + 1} - Dược phẩm chăm sóc sức khoẻ hằng ngày chất lượng cao`,
    image:
        'https://production-cdn.pharmacity.io/digital/640x640/plain/e-com/images/ecommerce/20250415090446-0-P03074.jpg',
}));
</script>

<style scoped>
.products-wrapper {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 24px;
    padding: 16px;
}

.filter {
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    padding: 12px;
}

.products {
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
    gap: 16px;
}
</style>