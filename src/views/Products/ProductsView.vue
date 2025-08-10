<template>
    <div class="products-wrapper">
        <div class="filter">
            <Filter />
        </div>
        <div>
            <div class="flex justify-between items-center gap-2 p-3">
                <div>
                    <span class="font-extrabold text-xl">Danh sách sản phẩm</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-extrabold">Sắp xếp theo: </span>
                    <div class="flex gap-2">
                        <a-button size="small" type="primary">Giá giảm dần</a-button>
                        <a-button size="small" type="primary">Giá tăng dần</a-button>
                    </div>
                </div>
            </div>
            <div class="products">
                <div v-for="item in items" class="product">
                    <ProductCard :data="item" />
                </div>
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
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 8px;
    padding: 12px;
}

.products {
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
    gap: 16px;
}
</style>