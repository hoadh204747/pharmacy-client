<template>
  <div class="w-full max-w-6xl mx-auto px-2 mt-2">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 aspect-auto sm:aspect-[3/1]">
      <!-- Carousel -->
      <div class="w-full h-96 object-cover sm:col-span-2">
        <a-carousel arrows class="h-full" autoplay>
          <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px;">
              <left-circle-outlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px;">
              <right-circle-outlined />
            </div>
          </template>
          <img loading="lazy" src="../../assets/banner-1.jpg" alt="Banner lớn" class="w-full h-96 object-cover" />
          <img loading="lazy"src="../../assets/slide1.jpg" alt="Banner lớn" class="w-full h-96 object-cover" />
          <img loading="lazy" src="../../assets/banner-1.jpg" alt="Banner lớn" class="w-full h-96 object-cover" />
        </a-carousel>
      </div>

      <!-- Small Banners -->
      <div class="flex sm:flex-col flex-row gap-2 sm:h-96 min-h-0">
  <img loading="lazy" src="../../assets/banner-2.jpg" alt="Banner nhỏ 1" class="w-full sm:h-0 sm:flex-1 object-cover h-36" />
  <img loading="lazy" src="../../assets/banner-2.jpg" alt="Banner nhỏ 2" class="w-full sm:h-0 sm:flex-1 object-cover h-36" />
</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}
</style>
