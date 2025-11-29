<template>
    <div class="cart-view">
        <div class="cart-left">
            <div class="list-product">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold">Sản phẩm trong đơn (3)</h3>
                </div>
                <div class="grid gap-2 md:gap-6 mt-4">
                    <div class="grid gap-4">
                        <!-- item1 -->
                        <CheckoutItem v-for="(item, idx) in cartItems" :key="item.id" :checked="item.checked"
                            :name="item.name" :image="item.image" :link="item.link" :price="item.price"
                            :quantity="item.quantity" :total="item.total" :srcset="item.srcset" />
                    </div>
                </div>
            </div>
            <InfoCustomerOrder />
        </div>
        <CartSummary :items="cartItems" @showDrawer="showDrawer" />
    </div>
    <Drawer v-model:open="open" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CheckoutItem from '@/components/Checkout/ProductCheckout/index.vue';
import Drawer from '@/components/Cart/Drawer/index.vue';
import CartSummary from '@/components/Cart/CartSummary.vue';
import InfoCustomerOrder from '@/components/Checkout/FormCustomerOrder/InfoCustomerOrder/index.vue';

const open = ref<boolean>(false);
const showDrawer = () => {
    open.value = true;
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

</script>

<style scoped>
.cart-view {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(220px, 320px);
    gap: 24px;
    padding: 16px;
}

.cart-right {
    border-radius: 8px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
}

.cart-left {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.list-product {
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    padding: 16px;
}

/* Responsive: dưới 768px chuyển sang 1 cột */
@media (max-width: 768px) {
    .cart-view {
        grid-template-columns: 1fr;
    }

    .cart-right {
        margin-top: 16px;
    }
}
</style>