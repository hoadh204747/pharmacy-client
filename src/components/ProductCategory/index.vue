<template>
    <section class="product-category-section py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h4 class="title">Danh mục nổi bật</h4>
                    <p class="subtitle">Các sản phẩm được chọn lọc — chất lượng & uy tín</p>
                </div>

                <a href="/products/category" class="view-more">
                    Xem thêm
                    <i class="pi pi-angle-right ml-2"></i>
                </a>
            </div>

            <!-- Carousel -->
            <div class="carousel-wrap">
                <Carousel class="category-carousel" :value="props.data" :numVisible="numVisible" :numScroll="numScroll"
                    :responsiveOptions="responsiveOptions">
                    <template #item="slotProps">
                        <div class="carousel-item">
                            <ProductCard :data="slotProps.data" />
                        </div>
                    </template>
                </Carousel>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import ProductCard from '@/components/ProductCard/ProductCard.vue';
import { ref } from 'vue';
import type { IGetProductResponse } from '@/api/models/product';

const props = defineProps<{
    data: IGetProductResponse[];
}>();

const numVisible = 5;
const numScroll = 3;
const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 5,
        numScroll: 2,
    },
    {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 2,
    },
    {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '640px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1,
    },
];
</script>

<style scoped>
:root {
    --primary: #8b5cf6;
    --primary-dark: #7c3aed;
    --muted: #6b7280;
    --card-border: #efe6ff;
}

/* Section background subtle */
.product-category-section {
    background: linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
}

/* Header */
.title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--primary-dark);
    margin: 0;
}

.subtitle {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 0.875rem;
}

/* View more link styled as subtle pill */
.view-more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(139, 92, 246, 0.08), rgba(167, 139, 250, 0.04));
    color: var(--primary-dark);
    font-weight: 600;
    text-decoration: none;
    border: 1px solid rgba(139, 92, 246, 0.08);
    transition: all .18s ease;
}

.view-more:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(139, 92, 246, 0.08);
}

/* Carousel adjustments */
.carousel-wrap {
    position: relative;
}

/* PrimeVue carousel item wrapper override */
.category-carousel :deep(.p-carousel) {
    padding-bottom: 0;
}

.category-carousel :deep(.p-carousel-viewport) {
    padding: 6px 0;
}

.category-carousel :deep(.p-carousel-item) {
    display: flex;
    align-items: stretch;
    justify-content: center;
    padding: 8px;
    box-sizing: border-box;
}

/* Make each carousel item card constrained and centered */
.carousel-item {
    width: 100%;
    max-width: 280px;
    display: flex;
    align-items: stretch;
    justify-content: center;
}

/* Subtle focus/hover effect on product card wrapper */
.carousel-item :deep(.group) {
    transition: transform .25s ease, box-shadow .25s ease;
}

.carousel-item :deep(.group):hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.08);
}

/* Responsive spacing tweaks */
@media (max-width: 1024px) {
    .carousel-item {
        max-width: 220px;
    }
}

@media (max-width: 640px) {
    .title {
        font-size: 1rem;
    }

    .subtitle {
        font-size: 0.8rem;
    }

    .carousel-item {
        max-width: 180px;
    }
}

/* keep existing line-clamp utility */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
