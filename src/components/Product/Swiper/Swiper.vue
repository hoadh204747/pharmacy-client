<template>
    <div>
        <Swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="mySwiper" ref="swiperRef"
            :initial-slide="activeIndex" @slideChange="onSlideChange">
            <SwiperSlide v-for="(img, idx) in images" :key="idx">
                <img :src="img" alt="" />
            </SwiperSlide>
        </Swiper>
        <!-- Thumbnails -->
        <div class="thumb-list">
            <button v-for="(img, idx) in images" :key="idx" @click="goToSlide(idx)"
                :class="['thumb', { active: idx === activeIndex }]">
                <img :src="img" alt="" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { ref } from 'vue';

const modules = [EffectCards];
const swiperRef = ref();
const activeIndex = ref(0);

const props = defineProps<{
    images: string[]
}>();

function goToSlide(idx: number) {
    activeIndex.value = idx;
    if (swiperRef.value && swiperRef.value.swiper) {
        swiperRef.value.swiper.slideTo(idx);
    }
}

function onSlideChange(swiper: any) {
    activeIndex.value = swiper.activeIndex;
}
</script>

<style scoped>
.swiper {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 12px;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 16px;
}

/* Thumbnails */
.thumb-list {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    margin-top: 12px;
    overflow-x: auto;
    padding-bottom: 4px;
}

.thumb {
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 0;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
}

.thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumb:hover {
    border-color: #a78bfa;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
}

.thumb.active {
    border-color: #8b5cf6;
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.4);
    background: #f3f4f6;
}

/* Scrollbar */
.thumb-list::-webkit-scrollbar {
    height: 4px;
}

.thumb-list::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 4px;
}

.thumb-list::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
}

.thumb-list::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>