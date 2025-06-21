<template>
  <div class="bg-white">
    <div class="flex flex-col md:flex-row items-center justify-between py-4 px-2 w-full max-w-6xl mx-auto gap-4">
      
      <!-- Logo -->
      <div class="flex items-center justify-center gap-1">
        <img class="w-10 h-10" src="../../assets/pharmacy.png" alt="Logo">
        <span class="text-2xl md:text-4xl font-bold text-green-700">Pharmacy</span>
      </div>

      <!-- Search -->
      <div class="w-full md:w-auto">
        <a-input-search
          enter-button
          placeholder="Search for medicines"
          class="w-full md:w-[300px]"
        />
      </div>

      <!-- Icons -->
      <div class="flex items-center justify-center gap-5">
        <div>
          <BellOutlined class="text-xl md:text-2xl" style="color: green;" />
        </div>
        <div>
          <ShoppingCartOutlined class="text-xl md:text-2xl" style="color: green;" />
        </div>
        <div class="flex items-center gap-1 px-2 py-1 rounded-lg border border-green-600 hover:bg-green-400 cursor-pointer">
          <UserOutlined class="text-xl md:text-base" style="color: green;" />
          <span class="text-sm md:text-base font-semibold hidden sm:inline">Login / Register</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { BellOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
</style>
