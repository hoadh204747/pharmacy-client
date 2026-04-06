<script setup lang="ts">
import type { IGetProductResponse } from '@/api/models/product';
import { ProductService } from '@/api/services/product';
import ProductCategory from '@/components/ProductCategory/index.vue';
import { onMounted, ref } from 'vue';
import { globalLoading } from '@/stores/loading'

const data = ref<IGetProductResponse[]>([]);

const getAllProducts = async () => {
  globalLoading.value = true;
  const res = await ProductService.getAllProducts();
  data.value = res;
  globalLoading.value = false;
}
onMounted(() => {
  getAllProducts();
});
</script>

<template>
  <main>
    <ProductCategory :data="data" />
  </main>
</template>
