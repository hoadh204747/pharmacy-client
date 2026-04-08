<template>
    <section class="carousel-category py-6">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-primary-dark">Mẹo & Thông tin</h3>
                <a class="text-sm text-muted hover:text-primary transition" href="/articles">Xem tất cả</a>
            </div>

            <Carousel :value="items" :numVisible="6" :numScroll="3" :responsiveOptions="responsiveOptions"
                class="category-carousel">
                <template #item="slotProps">
                    <button type="button" class="category-card"
                        @click="$router.push({ path: `/articles/${slotProps.data.slug || slotProps.data.name}` })"
                        aria-label="Open topic">
                        <div class="icon-wrap">
                            <img :src="slotProps.data.image" alt="" />
                        </div>
                        <div class="label" :title="slotProps.data.name">{{ slotProps.data.name }}</div>
                    </button>
                </template>
            </Carousel>
        </div>
    </section>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import { useRouter } from 'vue-router';
const router = useRouter();

const alarm_clock = new URL('../../assets/alarm-clock.png', import.meta.url).href;

const items: { name: string; image: string; slug?: string }[] = [
    { name: 'Mẹo chăm sóc sức khỏe', image: alarm_clock, slug: 'meo-suc-khoe' },
    { name: 'Thông tin thuốc', image: alarm_clock, slug: 'thong-tin-thuoc' },
    { name: 'Mẹo dinh dưỡng', image: alarm_clock, slug: 'meo-dinh-duong' },
    { name: 'Chăm sóc da', image: alarm_clock, slug: 'cham-soc-da' },
    { name: 'Mẹ và Bé', image: alarm_clock, slug: 'me-va-be' },
    { name: 'Thiết bị y tế', image: alarm_clock, slug: 'thiet-bi-y-te' },
    { name: 'Dinh dưỡng thể chất', image: alarm_clock, slug: 'dinh-duong' },
    { name: 'Lối sống lành mạnh', image: alarm_clock, slug: 'loi-song-lanh-manh' }
];

const numVisible = 6;
const numScroll = 3;
const responsiveOptions = [
    { breakpoint: '1400px', numVisible: 6, numScroll: 3 },
    { breakpoint: '1024px', numVisible: 4, numScroll: 2 },
    { breakpoint: '768px', numVisible: 3, numScroll: 1 },
    { breakpoint: '480px', numVisible: 2, numScroll: 1 }
];
</script>

<style scoped>
:root {
    --primary: #8b5cf6;
    --primary-dark: #6b21a8;
    --muted: #6b7280;
    --card-bg: #fff;
    --surface: rgba(139, 92, 246, 0.06);
}

/* Section */
.carousel-category {
    background: linear-gradient(180deg, rgba(139, 92, 246, 0.02) 0%, transparent 100%);
}

/* Header */
.text-primary-dark {
    color: var(--primary-dark);
}

.text-muted {
    color: var(--muted);
}

/* Carousel overrides */
.category-carousel :deep(.p-carousel) {
    padding-bottom: 0;
}

.category-carousel :deep(.p-carousel-viewport) {
    padding: 6px 0;
}

.category-carousel :deep(.p-carousel-item) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
}

/* Card */
.category-card {
    width: 100%;
    max-width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: var(--card-bg);
    border-radius: 12px;
    border: 1px solid rgba(139, 92, 246, 0.06);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.04);
    transition: transform .18s ease, box-shadow .18s ease;
    cursor: pointer;
    text-align: center;
}

.category-card:focus {
    outline: 2px solid rgba(139, 92, 246, 0.12);
    outline-offset: 2px;
}

.category-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 36px rgba(139, 92, 246, 0.08);
}

/* Icon */
.icon-wrap {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(139, 92, 246, 0.08), rgba(167, 139, 250, 0.03));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
}

.icon-wrap img {
    width: 44px;
    height: 44px;
    object-fit: cover;
    border-radius: 8px;
}

/* Label */
.label {
    font-size: 0.9rem;
    color: var(--primary-dark);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px;
}

/* Responsive */
@media (max-width: 1024px) {
    .category-card {
        max-width: 180px;
        padding: 10px;
    }

    .icon-wrap {
        width: 56px;
        height: 56px;
    }

    .label {
        max-width: 140px;
        font-size: 0.85rem;
    }
}

@media (max-width: 640px) {
    .category-card {
        max-width: 140px;
        padding: 8px;
    }

    .icon-wrap {
        width: 48px;
        height: 48px;
    }

    .label {
        max-width: 120px;
        font-size: 0.82rem;
    }
}
</style>