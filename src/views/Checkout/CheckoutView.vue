<template>
    <div class="cart-view">
        <div :class="[cartItems.length === 0 ? 'cart-left-empty' : 'cart-left']">
            <div v-if="cartItems.length > 0" class="list-product">
                <div class="flex justify-between items-center mb-4">
                    <h3 v-if="cartItems.length > 0" class="text-xl font-bold">Sản phẩm trong đơn ({{ cartItems.length
                    }})</h3>
                </div>
                <div class="space-y-0">
                    <!-- Cart items -->
                    <CheckoutItem v-for="(item, idx) in cartItems" :key="item.id" :checked="item.checked || false"
                        :name="item.name || ''" :image="item.imageUrl?.[0] || item.imageUrl[0] || ''"
                        :link="`/product/${item.id}`" :price="formatPrice(item.price)"
                        :quantity="item.cartQuantity || 1" :total="formatPrice(calculateItemTotal(item))"
                        :srcset="''" />
                </div>
            </div>
            <div v-if="cartItems.length === 0" class="text-center py-12">
                <Empty />
            </div>
            <div v-if="cartItems.length > 0">
                <InfoCustomerOrder />
                <AddressOrder />
                <PaymentMethod />
            </div>
        </div>
        <CartSummary v-if="cartItems.length > 0" :isSubmitting="isSubmitting" :items="cartItems"
            @showDrawer="showDrawer" @submitOrder="handleSubmitOrder" />
    </div>
    <Drawer v-model:open="open" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { message } from 'ant-design-vue';
import CheckoutItem from '@/components/Checkout/ProductCheckout/index.vue';
import Drawer from '@/components/Cart/Drawer/index.vue';
import CartSummary from '@/components/Cart/CartSummary.vue';
import InfoCustomerOrder from '@/components/Checkout/FormCustomerOrder/InfoCustomerOrder/index.vue';
import AddressOrder from '@/components/Checkout/FormCustomerOrder/AddressOrder/index.vue';
import PaymentMethod from '@/components/Checkout/PaymentMethod/index.vue';
import type { IGetProductResponse } from '@/api/models/product';
import { formatPrice } from '@/utils/format';
import Empty from '@/components/common/empty/index.vue';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { useCartStore } from '@/stores/cart';
import { OrderService } from '@/api/services/order';
import { useRouter } from 'vue-router';

interface CartItem extends IGetProductResponse {
    checked?: boolean;
    cartQuantity: number;
    addedAt: number;
}

const open = ref<boolean>(false);
const isSubmitting = ref(false);

const checkoutStore = useCheckoutStore();
const cartStore = useCartStore();
const router = useRouter();

const cartItems = computed(() => cartStore.cart as CartItem[]);

// Calculate total for item
const calculateItemTotal = (item: CartItem): number => {
    const price = (item.price);
    const quantity = item.cartQuantity || 1;
    return price * quantity;
};

const showDrawer = () => {
    open.value = true;
};

onMounted(() => {
    // Load cart from store on component mount
    cartStore.loadCart();
    console.log('Loaded cart items for checkout:', cartItems.value);

    if (cartItems.value.length === 0) {
        message.warning('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
    }
});

// Validate all checkout data before submit
const validateCheckout = (): boolean => {
    if (!checkoutStore.customerInfo.fullName?.trim()) {
        message.error('Vui lòng nhập họ và tên');
        return false;
    }

    if (!checkoutStore.customerInfo.phone?.trim()) {
        message.error('Vui lòng nhập số điện thoại');
        return false;
    }

    if (!checkoutStore.customerInfo.email?.trim()) {
        message.error('Vui lòng nhập email');
        return false;
    }

    if (!checkoutStore.addressInfo.province) {
        message.error('Vui lòng chọn tỉnh / thành phố');
        return false;
    }

    if (!checkoutStore.addressInfo.district) {
        message.error('Vui lòng chọn quận / huyện');
        return false;
    }

    if (!checkoutStore.addressInfo.ward) {
        message.error('Vui lòng chọn phường / xã');
        return false;
    }

    if (!checkoutStore.addressInfo.address?.trim()) {
        message.error('Vui lòng nhập địa chỉ cụ thể');
        return false;
    }

    return true;
};

const handleSubmitOrder = async () => {
    if (!validateCheckout()) {
        return;
    }

    if (cartItems.value.length === 0) {
        message.error('Giỏ hàng của bạn đang trống');
        return;
    }
    isSubmitting.value = true;
    try {
        const orderData = {
            paymentMethod: checkoutStore.paymentMethod,
            shippingAddress: {
                province: checkoutStore.addressInfo.province,
                district: checkoutStore.addressInfo.district,
                ward: checkoutStore.addressInfo.ward,
                address: checkoutStore.addressInfo.address,
                fullname: checkoutStore.customerInfo.fullName,
                phone: checkoutStore.customerInfo.phone,
                email: ''
            },
            orderItems: cartItems.value.map(item => ({
                productId: item.id,
                amount: item.cartQuantity
            }))
        };
        const result = await OrderService.createOrder(orderData);
        if (result.id) {
            message.success('Đơn hàng của bạn đã được tạo thành công!');
            checkoutStore.resetCheckout();
            cartStore.clearCart();
            router.push('/');
        } else {
            message.error('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.');
        }
    } catch (error) {
        message.error('Lỗi khi gửi đơn hàng');
    } finally {
        isSubmitting.value = false;

    }
};
</script>

<style scoped>
.cart-view {
    display: grid;
    gap: 24px;
    padding: 16px;
    max-width: 1280px;
    margin: 0 auto;
    background: #fbf7ff;
    min-height: calc(100vh - 200px);
}

.cart-no-item {
    grid-template-columns: minmax(0, 1fr) minmax(220px, 320px);
}

.cart-left {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
}

.cart-left-empty {
    display: flex;
    justify-content: center;
    align-items: center;
}

.list-product {
    background: white;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    padding: 16px;
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.06);
    min-width: 0;
    overflow: hidden;
}

.list-product h3 {
    color: #4c1d95;
    margin: 0;
}

/* Empty cart styling */
.pi-shopping-cart {
    opacity: 0.5;
}

/* Responsive: dưới 768px chuyển sang 1 cột */
@media (max-width: 1024px) {
    .cart-view {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}

@media (max-width: 768px) {
    .cart-view {
        grid-template-columns: 1fr;
        padding: 12px;
        gap: 16px;
    }

    .list-product {
        padding: 12px;
    }
}
</style>