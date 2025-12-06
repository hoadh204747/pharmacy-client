<template>
  <div class="product-view">
    <div class="product-left">
      <div class="product-description">
        <Swiper :images="data.imageUrl" />
        <MainInfo :product="data" />
      </div>
    </div>
    <div class="product-right">
      <!-- Quantity Section -->
      <div class="border-b border-gray-200 pb-6">
        <p class="text-gray-700 font-semibold text-sm mb-3">Số lượng</p>
        <div class="flex items-center gap-3 bg-gray-50 w-fit p-2 rounded-lg">
          <button @click="decreaseQuantity"
            class="rounded-full bg-gray-300 hover:bg-gray-400 w-8 h-8 flex items-center justify-center cursor-pointer transition">
            <MinusOutlined class="text-sm text-gray-700" />
          </button>
          <input type="text" class="w-12 text-center font-bold text-gray-900 bg-transparent border-0 outline-none"
            v-model.number="quantity" readonly>
          <button @click="increaseQuantity"
            class="rounded-full bg-gray-300 hover:bg-gray-400 w-8 h-8 flex items-center justify-center cursor-pointer transition">
            <PlusOutlined class="text-sm text-gray-700" />
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-2">Còn {{ data.amount }} sản phẩm</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-3 py-6 border-b border-gray-200">
        <a-button type="primary" size="large"
          class="w-full font-semibold text-base h-12 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-0">
          <i class="pi pi-bolt mr-2"></i>
          Mua ngay
        </a-button>
        <a-button size="large"
          class="w-full font-semibold text-base h-12 rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
          <i class="pi pi-shopping-cart mr-2"></i>
          Thêm vào giỏ hàng
        </a-button>
      </div>

      <!-- Benefits -->
      <div class="grid grid-cols-2 gap-4 py-6 border-b border-gray-200">
        <div class="text-center">
          <div class="flex justify-center mb-2">
            <i class="pi pi-clock text-green-500 text-2xl"></i>
          </div>
          <p class="text-xs font-semibold text-gray-800">Giao hàng siêu tốc</p>
          <p class="text-xs text-gray-500 mt-1">Trong 24h</p>
        </div>
        <div class="text-center">
          <div class="flex justify-center mb-2">
            <i class="pi pi-truck text-green-500 text-2xl"></i>
          </div>
          <p class="text-xs font-semibold text-gray-800">Miễn phí vận chuyển</p>
          <p class="text-xs text-gray-500 mt-1">Từ 50.000đ</p>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="pt-4 space-y-3">
        <div class="flex items-center gap-2">
          <i class="pi pi-shield text-green-600"></i>
          <span class="text-sm text-gray-700">Bảo hành chính hãng</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="pi pi-check-circle text-green-600"></i>
          <span class="text-sm text-gray-700">Hàng chính hãng 100%</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="pi pi-times-circle text-red-600"></i>
          <span class="text-sm text-gray-700">Không chấp nhận đổi trả</span>
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
const quantity = ref(1);

const getProductDetail = async () => {
  const res = await ProductService.getProductById(Number(route.params.id));
  data.value = res;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const increaseQuantity = () => {
  if (quantity.value < data.value.amount) {
    quantity.value++;
  }
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

.product-right {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 24px;
}

@media (max-width: 1024px) {
  .product-view {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 16px 8px;
  }

  .product-description {
    grid-template-columns: 1fr;
  }

  .product-right {
    padding: 16px;
  }
}
</style>
