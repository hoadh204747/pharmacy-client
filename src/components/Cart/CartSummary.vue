<template>
    <div class="cart-right flex flex-col space-y-4">
        <div>
            <div class="bg-white p-4 rounded-sm">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <i class="pi pi-receipt text-violet-500"></i>
                        <span>Khuyến mãi</span>
                    </div>
                    <div>
                        <button @click="$emit('showDrawer')" class="text-violet-500 cursor-pointer">Chọn mã</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div
                class="grid grid-flow-col items-center gap-2 rounded-sm bg-white md:grid-flow-row md:items-start md:gap-4 md:p-4">
                <div class="grid gap-4">
                    <div class="hidden grid-flow-col items-center justify-between gap-2 md:grid">
                        <p class="text-sm text-neutral-900">Tạm tính</p>
                        <p class="text-sm font-semibold text-neutral-900">{{ formattedSubTotal }}</p>
                    </div>
                    <div class="hidden grid-flow-col items-center justify-between gap-2 md:grid">
                        <p class="text-sm text-neutral-900">Giảm giá ưu đãi</p>
                        <p class="text-sm font-semibold text-neutral-900">-</p>
                    </div>
                    <div class="hidden grid-flow-col items-center justify-between gap-2 md:grid">
                        <p class="text-sm text-neutral-900">Giảm giá sản phẩm</p>
                        <p class="text-sm font-semibold text-neutral-900">-</p>
                    </div>
                    <div class="bg-[hsl(0,0%,82%)] h-[1px] hidden w-full md:block"></div>
                    <div
                        class="grid items-center justify-items-end gap-0.5 md:grid-flow-col md:justify-between md:gap-2">
                        <p class="text-sm text-neutral-900 md:text-base md:font-semibold">Tổng tiền</p>
                        <p class="text-xl font-bold leading-8 text-red-500 no-underline md:text-2xl">{{
                            formattedSubTotal }}</p>
                    </div>
                </div>
                <a-button type="primary" class="w-full md:w-auto"
                    @click="isCartPage ? router.push('/check-out') : handleSubmitOrder()" :loading="isSubmitting">
                    <i v-if="!isSubmitting" class="pi pi-shopping-cart mr-2"></i>
                    {{ isSubmitting ? 'Đang xử lý...' : `Mua hàng (${totalQuantity})` }}
                </a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import type { IGetProductResponse } from '@/api/models/product';
import { formatPrice } from '@/utils/format';
import { useCheckoutStore } from '@/stores/checkoutStore';

interface CartItem extends IGetProductResponse {
    cartQuantity: number;
    addedAt: number;
    checked?: boolean;
}

const props = defineProps<{
    items: CartItem[]
}>();

defineEmits(['showDrawer']);

const checkoutStore = useCheckoutStore();
const router = useRouter();
const isCartPage = router.currentRoute.value.name === 'cart';
console.log('isCartPage:', isCartPage, router.currentRoute.value.name);
const isSubmitting = ref(false);

// Parse price từ string hoặc number
const parsePrice = (price: string | number): number => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    // Remove all non-digit characters and convert to number
    return Number(price.toString().replace(/[^\d]/g, ''));
};

// Calculate subtotal as number (không format)
const subTotal = computed(() => {
    return props.items.reduce((sum, item) => {
        const price = parsePrice(item.price);
        const quantity = item.cartQuantity || 1;
        return sum + (price * quantity);
    }, 0);
});

// Format subtotal để hiển thị
const formattedSubTotal = computed(() => {
    return formatPrice(subTotal.value);
});

// Calculate total quantity
const totalQuantity = computed(() => {
    return props.items.reduce((sum, item) => sum + (item.cartQuantity || 1), 0);
});

// Validate all checkout data before submit
const validateCheckout = (): boolean => {
    // Validate customer info
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

    // Validate address info
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

// Submit order
const handleSubmitOrder = async () => {
    // Validate all data
    if (!validateCheckout()) {
        return;
    }

    if (props.items.length === 0) {
        message.error('Giỏ hàng của bạn đang trống');
        return;
    }

    isSubmitting.value = true;

    try {
        // Prepare order data
        const orderData = {
            customerInfo: checkoutStore.customerInfo,
            addressInfo: checkoutStore.addressInfo,
            paymentMethod: checkoutStore.paymentMethod,
            items: props.items.map(item => ({
                productId: item.id,
                quantity: item.cartQuantity || 1,
                price: parsePrice(item.price)
            })),
            totalAmount: subTotal.value
        };

        console.log('Submitting order:', orderData);

        // TODO: Replace with actual API endpoint
        // const response = await fetch('/api/orders', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(orderData)
        // });

        // if (!response.ok) {
        //     throw new Error('Failed to create order');
        // }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        message.success('Đơn hàng đã được tạo thành công!');

        // Clear checkout data
        checkoutStore.resetCheckout();

        // Clear cart localStorage
        localStorage.removeItem('pharmacy_cart');

        // Redirect to order confirmation page
        // router.push({ name: 'order-confirmation', params: { orderId: response.data.orderId } });
        router.push('/');
    } catch (error) {
        console.error('Order submission error:', error);
        message.error('Lỗi khi tạo đơn hàng. Vui lòng thử lại.');
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
.cart-right {
    position: sticky;
    top: 20px;
    max-width: 100%;
}

@media (max-width: 1024px) {
    .cart-right {
        position: static;
    }
}
</style>