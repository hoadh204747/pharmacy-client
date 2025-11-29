<template>
  <div class="product-view">
    <div class="product-left">
      <div class="product-description">
        <Swiper :images="data.imageUrl" />
        <MainInfo :product="data" />
      </div>
    </div>
    <div class="product-right">
      <div class="text-center mb-4">
        <div>
          <span class="font-bold">Số lượng</span>
        </div>
        <button class="rounded-full bg-[hsl(0,0%,82%)] w-6 h-6 cursor-pointer">
          <MinusOutlined class="text-xs" />
        </button>
        <input type="text" class="w-12 text-center font-semibold" value="2">
        <button class="rounded-full bg-[hsl(0,0%,82%)] w-6 h-6 cursor-pointer">
          <PlusOutlined class="text-xs" />
        </button>
      </div>
      <div class="flex flex-col gap-3">
        <a-button class="" type="primary">Mua ngay</a-button>
        <a-button class="">Thêm vào giỏ hàng</a-button>
      </div>
      <div class="flex justify-around gap-3 mt-4">
        <div class="text-center">
          <div>
            <i class="pi pi-clock text-green-500"></i>
          </div>
          <p>Giao hàng siêu tốc</p>
        </div>
        <div class="text-center">
          <div>
            <i class="pi pi-truck text-green-500"></i>
          </div>
          <p>Miễn phí vận chuyển</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Swiper from '@/components/Product/Swiper/Swiper.vue';
import MainInfo from '@/components/Product/MainInfo/index.vue';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { ProductService } from '@/api/services/product';
import { useRoute } from 'vue-router';
import type { IGetProductResponse } from '@/api/models/product';

const route = useRoute();
const data = ref<IGetProductResponse>({} as IGetProductResponse);

const getProductDetail = async () => {
  const res = await ProductService.getProductById(Number(route.params.id));
  data.value = res;
};
onMounted(() => {
  getProductDetail();
});

</script>

<style scoped>
.product-view {
  background-color: #fff;
  display: grid;
  grid-template-columns: min(74%, calc(888rem/16)) 1fr;
  gap: 32px;
  padding: 32px 16px;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
}

.product-description {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.product-view>div:nth-child(2) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 32px 24px;
}

.product-view>div:nth-child(2) h1 {
  margin-bottom: 12px;
}

.product-view>div:nth-child(2) p {
  margin-bottom: 8px;
}

.product-view>div:nth-child(2) button {
  margin-top: 16px;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s;
}

.product-view>div:nth-child(3) {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 8px 12px;
}

.product-view>div:nth-child(3) h2 {
  margin-bottom: 12px;
}

.product-view>div:nth-child(3) ul {
  margin-top: 8px;
}

@media (max-width: 1024px) {
  .product-view {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 16px 8px;
  }

  .swiper {
    max-width: 100%;
    height: 320px;
  }

  .product-view>div:nth-child(2),
  .product-view>div:nth-child(3) {
    padding: 24px 12px;
  }

  .thumb-list {
    gap: 8px;
    margin-top: 12px;
  }

  .thumb {
    width: 40px;
    height: 40px;
  }

  .thumb img {
    width: 32px;
    height: 32px;
  }
}
</style>
