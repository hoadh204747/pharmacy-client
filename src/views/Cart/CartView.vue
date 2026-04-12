<template>
    <div :class="['cart-view', cartItems.length > 0 ? 'cart-no-empty' : 'cart-empty']">
        <div :class="[cartItems.length > 0 ? 'cart-left' : 'cart-left-empty']">
            <div class="p-3">
                <div class="flex justify-between items-center">
                    <h3 v-if="cartItems.length > 0" class="text-2xl font-bold">Giỏ hàng ({{ cartItems.length }})</h3>
                    <a-popconfirm title="Bạn có chắc muốn xóa toàn bộ sản phẩm?" ok-text="Xóa" cancel-text="Hủy"
                        @confirm="confirm" @cancel="cancel">
                        <button class="text-purple-600 cursor-pointer" v-if="cartItems.length > 0">Xóa tất cả</button>
                    </a-popconfirm>
                </div>
                <div class="grid gap-2 md:gap-6">
                    <div v-if="cartItems.length > 0" class="mt-4 p-4 free-shipping rounded">
                        <p>Miễn phí vận chuyển cho mọi đơn hàng từ 0đ</p>
                    </div>
                    <div class="grid gap-4">
                        <div v-if="cartItems.length > 0"
                            class="hidden grid-cols-[calc(16rem/16)_1fr_calc(24rem/16)] items-center gap-4 md:grid">
                            <a-checkbox :checked="checkedAll" @change="toggleCheckAll"></a-checkbox>
                            <div class="flex items-center space-x-4 justify-between">
                                <div class="grid flex-1 items-start gap-2">
                                    <p class="text-sm leading-4 text-neutral-900">Sản phẩm</p>
                                </div>
                                <div class="flex justify-center space-x-4">
                                    <p class="w-[calc(160rem/16)] text-center text-sm text-neutral-900">Giá</p>
                                    <p class="w-[calc(117rem/16)] text-center text-sm text-neutral-900">Số lượng</p>
                                    <p class="w-[calc(120rem/16)] text-end text-sm text-neutral-900">Tổng tiền</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="cartItems.length > 0" class="divider-line hidden w-full md:block"></div>

                        <!-- Empty cart message -->
                        <div v-if="cartItems.length === 0" class="text-center py-12">
                            <Empty />
                        </div>

                        <!-- Cart items -->
                        <CartItem v-for="(item, idx) in cartItems" :key="item.id" :checked="item.checked"
                            :name="item.name" :image="item.imageUrl[0]" :link="`/products/${item.id}`"
                            :price="formatPrice(item.price)" :quantity="item.cartQuantity" :total="calculateTotal(item)"
                            @toggle="toggleItem(idx)" @increase="increaseItem(idx)" @decrease="decreaseItem(idx)"
                            @delete="deleteItem(idx)" @cancel="cancel" />
                    </div>
                </div>
            </div>
        </div>
        <CartSummary v-if="cartItems.length > 0" :items="cartItems" @showDrawer="showDrawer" />
    </div>
    <Drawer v-model:open="open" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { message } from 'ant-design-vue';
import CartItem from '@/components/Cart/Item/CartItem.vue';
import Drawer from '@/components/Cart/Drawer/index.vue';
import CartSummary from '@/components/Cart/CartSummary.vue';
import { useCartStore } from '@/stores/cart';
import type { IGetProductResponse } from '@/api/models/product';
import Empty from '@/components/common/empty/index.vue';

interface CartViewItem extends IGetProductResponse {
    checked: boolean;
    cartQuantity: number;
    addedAt: number;
}

const cartStore = useCartStore();
const open = ref<boolean>(false);

const cartItems = computed(() => cartStore.cart as CartViewItem[]);

const checkedAll = computed({
    get: () => cartItems.value.length > 0 && cartItems.value.every(item => item.checked),
    set: (value) => cartStore.toggleCheckAll(value)
});

// Format price string (remove ₫ and non-digits, return number)
const formatPrice = (price: string | number | undefined | null): number => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
        return Number(price.replace(/[^\d]/g, '')) || 0;
    }
    return 0;
};

// Calculate total for item
const calculateTotal = (item: CartViewItem): number => {
    const price = formatPrice(item.price);
    return price * (item.cartQuantity ?? 0);
};

const showDrawer = () => {
    open.value = true;
};

const confirm = () => {
    cartStore.clearCart();
    message.success('Đã xóa toàn bộ sản phẩm trong giỏ hàng');
};

const cancel = () => {
    message.info('Hủy thao tác');
};

function toggleCheckAll() {
    checkedAll.value = !checkedAll.value;
}

function toggleItem(idx: number) {
    cartStore.toggleItemCheck(idx);
}

function increaseItem(idx: number) {
    cartStore.updateItem(idx, cartItems.value[idx].cartQuantity + 1);
}

function decreaseItem(idx: number) {
    if (cartItems.value[idx].cartQuantity > 1) {
        cartStore.updateItem(idx, cartItems.value[idx].cartQuantity - 1);
    }
}

function deleteItem(idx: number) {
    const itemName = cartItems.value[idx].name;
    cartStore.removeFromCart(idx);
    message.success(`Đã xóa "${itemName}" khỏi giỏ hàng`);
}

onMounted(() => {
    // Load cart from store on component mount
    cartStore.loadCart();
    console.log('Loaded cart items:', cartItems.value);
});
</script>

<style scoped>
.cart-view {
    display: grid;
    gap: 24px;
    padding: 24px;
    max-width: 1280px;
    margin: 0 auto;
    background: #fbf7ff;
    min-height: calc(100vh - 200px);
}

.cart-no-empty {
    grid-template-columns: 1fr 320px;
}

/* Left panel */
.cart-left {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.06);
    overflow: hidden;
    border: 1px solid #f3e8ff;
}

.cart-left-empty {
    display: flex;
    justify-content: center;
    align-items: center;
}

.cart-left>div {
    padding: 24px;
}

/* Free shipping box */
.free-shipping {
    background: linear-gradient(135deg, #f5f3ff 0%, #f3e8ff 100%);
    border: 1px solid #e9d5ff;
    color: #5b21b6;
    font-weight: 600;
    border-radius: 8px;
}

/* Divider line between header and items */
.divider-line {
    height: 1px;
    background: #efe6ff;
    margin: 8px 0 0 0;
}

/* Headings and small text */
.cart-left h3 {
    color: #4c1d95;
}

.cart-left p,
.cart-left .text-sm {
    color: #4c1d95;
}

/* Buttons and links */
.cart-left button {
    color: #7c3aed;
    font-weight: 600;
    transition: all 0.2s ease;
}

.cart-left button:hover {
    color: #6d28d9;
    text-decoration: underline;
}

/* Checkbox styling for Antd */
.cart-left :deep(.ant-checkbox) {
    --ant-primary-color: #8b5cf6;
}

.cart-left :deep(.ant-checkbox-inner) {
    border-radius: 4px;
}

.cart-left :deep(.ant-checkbox-checked .ant-checkbox-inner) {
    background-color: #8b5cf6;
    border-color: #8b5cf6;
}

/* Product totals text */
.cart-left :deep(.text-neutral-900) {
    color: #2d0b45;
}

/* Empty cart styling */
.pi-shopping-cart {
    opacity: 0.5;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .cart-view {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 16px;
    }
}

@media (max-width: 768px) {
    .cart-view {
        padding: 12px;
        gap: 16px;
    }

    .cart-left>div {
        padding: 16px;
    }
}
</style>