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
    max-width: 280px;
    height: 360px;
    margin: 0 auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background: #f3f4f6;
}

.swiper-slide img {
    width: 90%;
    height: 90%;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
}

/* Thumbnails */
.thumb-list {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 16px;
}

.thumb {
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 2px;
    background: #fff;
    cursor: pointer;
    transition: border 0.2s;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.thumb img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 6px;
}

.thumb.active {
    border-color: #32d13a;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}
</style>