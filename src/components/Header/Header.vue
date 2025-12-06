<template>
  <div class="header-gradient">
    <div class="flex flex-col md:flex-row items-center justify-between py-4 px-2 w-full max-w-6xl mx-auto gap-4">

      <!-- Logo -->
      <div class="flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition">
        <img class="w-10 h-10" src="../../assets/pharmacy-app.png" alt="Logo">
        <span class="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Pharmacy</span>
      </div>

      <!-- Search -->
      <div class="w-full md:w-auto">
        <a-input-search enter-button placeholder="Tìm kiếm thuốc..." class="search-input w-full md:w-[350px]" />
      </div>

      <!-- Icons -->
      <div class="flex items-center justify-center gap-6">
        <div class="icon-hover group">
          <BellOutlined class="text-xl md:text-2xl text-white group-hover:text-yellow-300 transition" />
          <span
            class="text-xs text-white opacity-0 group-hover:opacity-100 absolute top-12 bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap transition">Thông
            báo</span>
        </div>
        <div class="icon-hover group relative">
          <ShoppingCartOutlined class="text-xl md:text-2xl text-white group-hover:text-emerald-300 transition" />
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">0</span>
          <span
            class="text-xs text-white opacity-0 group-hover:opacity-100 absolute top-12 bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap transition">Giỏ
            hàng</span>
        </div>
        <div
          class="flex items-center gap-2 px-3 py-1 rounded-lg bg-white bg-opacity-15 border-2 border-white border-opacity-40  hover:bg-opacity-25 hover:border-opacity-60 cursor-pointer transition group">
          <UserOutlined class="text-lg md:text-xl group-hover:text-yellow-300 transition" />
          <span class="text-sm md:text-base font-semibold group-hover:text-violet-400 transition">Đăng nhập</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { BellOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
.header-gradient {
  background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c4b5fd 100%);
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
}

.search-input :deep(.ant-input-affix-wrapper) {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 8px 12px;
  transition: all 0.3s ease;
}

.search-input :deep(.ant-input-affix-wrapper:hover),
.search-input :deep(.ant-input-affix-wrapper:focus-within) {
  background: rgba(255, 255, 255, 1);
  border-color: #8b5cf6;
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.3);
}

.search-input :deep(.ant-input) {
  color: #374151;
  font-size: 14px;
}

.search-input :deep(.ant-input::placeholder) {
  color: #9ca3af;
}

.search-input :deep(.ant-input-search-button) {
  background: #8b5cf6;
  border-color: #8b5cf6;
  color: white;
  font-weight: 600;
  border-radius: 6px;
}

.search-input :deep(.ant-input-search-button:hover) {
  background: #7c3aed;
  border-color: #7c3aed;
}

.icon-hover {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
