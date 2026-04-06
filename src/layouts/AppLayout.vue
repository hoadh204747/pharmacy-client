<template>
    <a-config-provider :theme="{ token: { colorPrimary: '#8b5cf6' } }">
        <a-spin v-if="globalLoading" size="large" tip="Đang tải..." class="global-loading" />
        <div>
            <Advertisement />
            <Header />
            <Navbar :categories="categories" />
            <Banner />
            <!-- <CarouselCategory /> -->
            <!-- <FlashSale /> -->
            <div class="py-3 w-6xl mr-auto ml-auto bg-fuchsia-100 my-6 rounded-lg">
                <router-view></router-view>
            </div>
            <Footer />
        </div>
    </a-config-provider>
</template>

<script setup lang="ts">
import Banner from '@/components/Banner/Banner.vue';
import Header from '@/components/Header/Header.vue';
import Advertisement from '@/components/Advertisement/index.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import Footer from '@/components/Footer/Footer.vue';
import FlashSale from '@/components/FlashSale/FlashSale.vue';
import CarouselCategory from '@/components/CarouselCategory/index.vue';
import type { IGetCategoryResponse } from '@/api/models/category';
import { CategoryService } from '@/api/services/category';
import { onMounted, ref } from 'vue';
import { globalLoading } from '@/stores/loading'

const categories = ref<IGetCategoryResponse[]>([]);

const fetchCategories = async () => {
    const res = await CategoryService.getAllCategories();
    categories.value = res;
};

onMounted(() => {
    fetchCategories();
});
</script>

<style scoped>
.global-loading {
    position: fixed !important;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.45);
    display: flex !important;
    justify-content: center;
    align-items: center;
}
</style>