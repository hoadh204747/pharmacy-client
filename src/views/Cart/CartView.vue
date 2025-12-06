<template>
    <div class="cart-view">
        <div class="cart-left">
            <div class="p-3">
                <div class="flex justify-between items-center">
                    <h3 class="text-2xl font-bold">Giỏ hàng (3)</h3>
                    <a-popconfirm title="Are you sure delete all?" ok-text="Yes" cancel-text="No" @confirm="confirm"
                        @cancel="cancel">
                        <button class="text-purple-600 cursor-pointer">Xóa</button>
                    </a-popconfirm>
                </div>
                <div class="grid gap-2 md:gap-6">
                    <div class="mt-4 p-4 free-shipping rounded">
                        <p>Miễn phí vận chuyển cho mọi đơn hàng từ 0đ</p>
                    </div>
                    <div class="grid gap-4">
                        <div class="hidden grid-cols-[calc(16rem/16)_1fr_calc(24rem/16)] items-center gap-4 md:grid">
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
                        <div class="divider-line hidden w-full md:block"></div>
                        <!-- item1 -->
                        <CartItem v-for="(item, idx) in cartItems" :key="item.id" :checked="item.checked"
                            :name="item.name" :image="item.image" :link="item.link" :price="item.price"
                            :quantity="item.quantity" :total="item.total" :srcset="item.srcset"
                            @toggle="toggleItem(idx)" @increase="increaseItem(idx)" @decrease="decreaseItem(idx)"
                            @delete="deleteItem(idx)" @cancel="cancel" />
                    </div>
                </div>
            </div>
        </div>
        <CartSummary :items="cartItems" @showDrawer="showDrawer" />
    </div>
    <Drawer v-model:open="open" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import CartItem from '@/components/Cart/Item/CartItem.vue';
import Drawer from '@/components/Cart/Drawer/index.vue';
import CartSummary from '@/components/Cart/CartSummary.vue';

const open = ref<boolean>(false);
const showDrawer = () => {
    open.value = true;
};

const confirm = () => {
    cartItems.value = [];
    message.success('Đã xóa toàn bộ sản phẩm trong giỏ hàng');
};

const cancel = (e: MouseEvent) => {
    message.error('Click on No');
};

// Bổ sung dữ liệu cho từng item
const cartItems = ref([
    {
        id: 1,
        checked: false,
        name: 'Sữa bột dinh dưỡng PEDIASURE',
        image: 'https://production-cdn.pharmacity.io/digital/640x640/plain/e-com/images/promotion_sku_images/20250619040558-0-P20532.png',
        link: '#',
        price: '180.000 ₫',
        quantity: 2,
        total: '360.000 ₫',
        srcset: ''
    },
    {
        id: 2,
        checked: false,
        name: 'Vitamin C 500mg',
        image: 'https://production-cdn.pharmacity.io/digital/640x640/plain/e-com/images/ecommerce/P20532_1.jpg',
        link: '#',
        price: '120.000 ₫',
        quantity: 1,
        total: '120.000 ₫',
        srcset: ''
    }
]);

const checkedAll = ref(false);

function toggleCheckAll() {
    checkedAll.value = !checkedAll.value;
    cartItems.value.forEach(item => item.checked = checkedAll.value);
}

function toggleItem(idx: number) {
    cartItems.value[idx].checked = !cartItems.value[idx].checked;
    checkedAll.value = cartItems.value.every(item => item.checked);
}

function increaseItem(idx: number) {
    cartItems.value[idx].quantity++;
    updateTotal(idx);
}
function decreaseItem(idx: number) {
    if (cartItems.value[idx].quantity > 1) {
        cartItems.value[idx].quantity--;
        updateTotal(idx);
    }
}
function deleteItem(idx: number) {
    cartItems.value.splice(idx, 1);
}
function updateTotal(idx: number) {
    // Giả sử price là dạng "180.000 ₫"
    const price = Number(cartItems.value[idx].price.replace(/[^\d]/g, ''));
    cartItems.value[idx].total = (price * cartItems.value[idx].quantity).toLocaleString('vi-VN') + ' ₫';
}
</script>

<style scoped>
.cart-view {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
    padding: 24px;
    max-width: 1280px;
    margin: 0 auto;
    background: #fbf7ff;
    min-height: calc(100vh - 200px);
}

/* Left panel */
.cart-left {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.06);
    overflow: hidden;
    border: 1px solid #f3e8ff;
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

/* Right summary panel */
.cart-right {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.06);
    border: 1px solid #f3e8ff;
    height: fit-content;
    position: sticky;
    top: 100px;
    padding: 20px;
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

/* Checkbox styling for Antd (scoped deep selector) */
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

/* Cart item separator */
.cart-left :deep(.cart-item-separator) {
    background: #f3e8ff;
}

/* Product totals text */
.cart-left :deep(.text-neutral-900) {
    color: #2d0b45;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .cart-view {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 16px;
    }

    .cart-right {
        position: static;
        top: auto;
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

    .cart-right {
        padding: 16px !important;
    }
}
</style>