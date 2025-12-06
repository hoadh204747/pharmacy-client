<template>
    <section class="flashsale-banner">
        <div class="flashsale-content">
            <div class="flash-left">
                <div class="flash-badge">⚡ FLASH SALE</div>

                <div class="flash-head">
                    <h2 class="flash-title">Đại tiệc cuối năm</h2>
                    <div class="flash-big">BIG SALE</div>
                    <p class="flash-sub">Ưu đãi sốc trong thời gian có hạn</p>
                </div>

                <div class="flash-timecards">
                    <div class="time-card active">
                        <div class="label">Đang diễn ra</div>
                        <div class="range">00:00 - 23:59</div>
                        <div class="date">06/12</div>
                    </div>
                    <div class="time-card">
                        <div class="label">Sắp diễn ra</div>
                        <div class="range">00:00 - 23:59</div>
                        <div class="date">07/12</div>
                    </div>
                </div>

                <div class="flash-chips">
                    <button class="chip">Giá tốt chốt ngay</button>
                    <button class="chip">Deal sức khỏe, sale đậm</button>
                    <button class="chip">Deal collagen siêu hời</button>
                </div>

                <div class="flash-countdown" :title="endAtString">
                    <div class="label">Kết thúc sau</div>
                    <div class="count">
                        <template v-if="!finished">
                            <span class="box">{{ timeParts.hours }}</span><span class="sep">:</span>
                            <span class="box">{{ timeParts.minutes }}</span><span class="sep">:</span>
                            <span class="box">{{ timeParts.seconds }}</span>
                        </template>
                        <template v-else>
                            <span class="ended">Đã kết thúc</span>
                        </template>
                    </div>
                </div>
            </div>

            <div class="flash-right">
                <a class="see-more" href="/products/flashsale">Xem thêm ›</a>
            </div>
        </div>

        <div class="flash-carousel-wrap">
            <Carousel v-if="saleItems.length" :value="saleItems" :numVisible="numVisible" :numScroll="numScroll"
                :responsiveOptions="responsiveOptions" class="flash-carousel">
                <template #item="slotProps">
                    <div class="slide-item">
                        <ProductCard :data="slotProps.data" />
                    </div>
                </template>
            </Carousel>

            <div v-else class="no-item">Không có sản phẩm khuyến mãi</div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Carousel from 'primevue/carousel';
import ProductCard from '@/components/ProductCard/ProductCard.vue';
import type { IGetProductResponse } from '@/api/models/product';

const props = defineProps<{
    items?: IGetProductResponse[];
    endAt?: string | number | Date;
    numVisible?: number;
    numScroll?: number;
}>();

const numVisible = props.numVisible ?? 5;
const numScroll = props.numScroll ?? 2;

const responsiveOptions = [
    { breakpoint: '1400px', numVisible: Math.max(4, numVisible), numScroll: Math.max(2, numScroll) },
    { breakpoint: '1024px', numVisible: 3, numScroll: 2 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '480px', numVisible: 1, numScroll: 1 }
];

const saleItems = computed(() => {
    return (props.items ?? []).filter(p => Number(p.discount) > 0);
});

const endAtTime = ref<number>(Date.now() + 1000 * 60 * 60);
if (props.endAt) {
    const t = typeof props.endAt === 'string' || typeof props.endAt === 'number'
        ? new Date(props.endAt).getTime()
        : (props.endAt as Date).getTime();
    if (!Number.isNaN(t)) endAtTime.value = t;
}

const now = ref(Date.now());
const finished = ref(false);
let timerId: ReturnType<typeof setInterval> | null = null;

const updateNow = () => {
    now.value = Date.now();
    if (now.value >= endAtTime.value) {
        finished.value = true;
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    }
};

onMounted(() => {
    updateNow();
    timerId = setInterval(updateNow, 1000);
});
onUnmounted(() => {
    if (timerId) clearInterval(timerId);
});

const remainingMs = computed(() => Math.max(0, endAtTime.value - now.value));
const timeParts = computed(() => {
    const total = Math.floor(remainingMs.value / 1000);
    const hours = Math.floor(total / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((total % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(total % 60).toString().padStart(2, '0');
    return { hours, minutes, seconds };
});

const endAtString = computed(() => new Date(endAtTime.value).toLocaleString());
</script>

<style scoped>
:root {
    --primary: #8b5cf6;
    --primary-dark: #7c3aed;
}

/* Use red gradient background instead of image */
.flashsale-banner {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
    padding: 18px 0;
    position: relative;
    overflow: hidden;
}

/* Decorative elements */
.flashsale-banner::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}

.flashsale-banner::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}

/* content area */
.flashsale-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 14px;
    display: grid;
    grid-template-columns: 1fr 220px;
    gap: 16px;
    align-items: stretch;
    height: 420px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
}

/* left hero */
.flash-left {
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: center;
    padding: 24px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0));
    border-radius: 12px;
}

/* badge + headings */
.flash-badge {
    display: inline-block;
    background: linear-gradient(90deg, #ffd166, #ffb4a2);
    color: #111;
    padding: 6px 12px;
    font-weight: 800;
    border-radius: 10px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.flash-head .flash-title {
    margin: 0;
    font-size: 34px;
    font-weight: 800;
    letter-spacing: -1px;
}

.flash-big {
    font-size: 64px;
    font-weight: 900;
    color: #fff;
    text-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
    -webkit-text-stroke: 2px rgba(0, 0, 0, 0.1);
}

.flash-sub {
    margin: 0;
    color: rgba(255, 255, 255, 0.95);
    font-weight: 500;
}

/* time cards */
.flash-timecards {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
}

.time-card {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    padding: 10px 12px;
    border-radius: 10px;
    min-width: 140px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(4px);
}

.time-card.active {
    background: #fff;
    color: #7f1d1d;
    font-weight: 600;
}

.time-card .label {
    font-size: 12px;
}

.time-card .range {
    font-weight: 700;
    margin-top: 6px;
}

.time-card .date {
    font-size: 12px;
    opacity: 0.85;
    margin-top: 2px;
}

/* chips */
.flash-chips {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 4px;
}

.chip {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
    border: none;
    padding: 8px 14px;
    border-radius: 999px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(4px);
}

.chip:hover {
    background: rgba(255, 255, 255, 0.28);
    transform: translateY(-2px);
}

/* countdown */
.flash-countdown {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 6px;
}

.flash-countdown .label {
    color: #fff;
    font-weight: 700;
}

.count {
    display: flex;
    align-items: center;
    gap: 8px;
}

.box {
    background: #fff;
    color: #7f1d1d;
    font-weight: 800;
    padding: 8px 10px;
    border-radius: 8px;
    min-width: 42px;
    text-align: center;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.sep {
    color: #fff;
    font-weight: 800;
    font-size: 18px;
}

.ended {
    color: #fbbf24;
    font-weight: 800;
}

/* right small area */
.flash-right {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 20px;
}

.see-more {
    color: #fff;
    background: rgba(0, 0, 0, 0.18);
    padding: 10px 16px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: all 0.2s ease;
}

.see-more:hover {
    background: rgba(0, 0, 0, 0.28);
    transform: translateY(-2px);
}

/* carousel below hero */
.flash-carousel-wrap {
    max-width: 1280px;
    margin: 18px auto 0;
    padding: 0 14px;
}

.flash-carousel :deep(.p-carousel-viewport) {
    padding: 6px 0;
}

.slide-item {
    display: flex;
    justify-content: center;
    padding: 8px;
}

/* fallback */
.no-item {
    padding: 24px;
    text-align: center;
    color: #6b7280;
    background: #fff;
    border-radius: 8px;
}

/* responsive */
@media (max-width: 1024px) {
    .flashsale-content {
        grid-template-columns: 1fr;
        height: auto;
    }

    .flash-right {
        justify-content: flex-start;
        align-items: center;
        padding-left: 0;
    }

    .flash-big {
        font-size: 42px;
    }

    .flash-head .flash-title {
        font-size: 26px;
    }
}

@media (max-width: 640px) {
    .flash-big {
        font-size: 28px;
    }

    .flash-head .flash-title {
        font-size: 18px;
    }

    .time-card {
        min-width: 120px;
        padding: 8px 10px;
    }

    .flash-left {
        padding: 14px;
        gap: 10px;
    }
}
</style>