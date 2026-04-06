<template>
  <div class="header-gradient">
    <div class="flex flex-col md:flex-row items-center justify-between py-4 px-2 w-full max-w-6xl mx-auto gap-4">

      <!-- Logo -->
      <div class="flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition"
        @click="$router.push('/')">
        <img class="w-10 h-10" src="../../assets/pharmacy-app.png" alt="Logo">
        <span class="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Pharmacy</span>
      </div>

      <!-- Search -->
      <div class="w-full md:w-auto">
        <a-input-search enter-button placeholder="Tìm kiếm thuốc..." class="search-input w-full md:w-[350px]"
          style="width: 400px;" />
      </div>

      <!-- Icons -->
      <div class="flex items-center justify-center gap-6">

        <router-link to="/cart" class="flex items-center gap-2">
          <div
            class="icon-hover group relative flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-500 text-white bg-opacity-15 border-opacity-40 hover:bg-opacity-25 hover:border-opacity-60 cursor-pointer transition group">
            <a-badge :size="'small'" :count="cartCount" class="animate-pulse">
              <i class="pi pi-shopping-cart text-lg" style="color: #fff;"></i>
            </a-badge>
            <span class="text-sm md:text-base font-semibold">Giỏ hàng</span>
          </div>
        </router-link>

        <a-dropdown :placement="'bottom'" :arrow="{ pointAtCenter: true }">
          <div @click="openAuthDialog"
            class="flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-500 bg-opacity-15 text-white border-opacity-40 hover:bg-opacity-25 hover:border-opacity-60 cursor-pointer transition group">
            <i class="pi pi-user text-lg"></i>
            <span class="text-sm md:text-base font-semibold">
              {{ userStore.isLogin ? userStore.username : "Đăng nhập" }}
            </span>
          </div>
          <template #overlay v-if="userStore.isLogin">
            <a-menu>
              <a-menu-item key="1" @click="() => $router.push('/ca-nhan/thong-tin')">
                <div>
                  <i class="pi pi-user mr-2"></i>
                  <span>Thông tin cá nhân</span>
                </div>
              </a-menu-item>
              <a-menu-item key="2" @click="() => $router.push('/ca-nhan/don-hang')">
                <div>
                  <i class="pi pi-shopping-cart mr-2"></i>
                  <span>Đơn hàng của tôi</span>
                </div>
              </a-menu-item>
              <a-menu-item key="3">
                <div>
                  <i class="pi pi-sign-out mr-2"></i>
                  <span @click="handleLogout">Đăng xuất</span>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>

    </div>
  </div>

  <!-- Auth Dialog -->
  <AuthDialog ref="authDialogRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { IGetProductResponse } from '@/api/models/product';
import AuthDialog from '@/components/Auth/AuthDialog.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const CART_KEY = 'pharmacy_cart';

interface CartItem extends IGetProductResponse {
  cartQuantity: number;
  addedAt: number;
}

const cartCount = ref(0);
const authDialogRef = ref<InstanceType<typeof AuthDialog>>();


// Get cart from localStorage
const getCart = (): CartItem[] => {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Failed to parse cart from localStorage:', error);
    return [];
  }
};

// Calculate total items in cart
const updateCartCount = () => {
  const cart = getCart();
  cartCount.value = cart.reduce((sum, item) => sum + item.cartQuantity, 0);
};

// Listen for cart changes
const watchCart = () => {
  window.addEventListener('storage', updateCartCount);
};

// Open auth dialog
const openAuthDialog = () => {
  if (userStore.isLogin) return;
  authDialogRef.value?.openModal();
};

const handleLogout = () => {
  userStore.logout();
  localStorage.removeItem('token');
};

onMounted(() => {
  updateCartCount();
  watchCart();
});
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

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
