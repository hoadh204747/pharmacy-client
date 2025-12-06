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
                        <p class="text-sm font-semibold text-neutral-900">{{ subTotal }}</p>
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
                        <p class="text-sm text-neutral-900 md:text-base md:font-semibold">Tổng tính</p>
                        <p class="text-xl font-bold leading-8 text-red-500 no-underline md:text-2xl">{{ subTotal }}</p>
                    </div>
                </div>
                <a-button type="primary">Mua hàng ({{ totalQuantity }})</a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
    items: Array<{
        price: string;
        quantity: number;
        total: string;
    }>
}>();

const subTotal = computed(() => {
    // Tính tổng tiền từ các item
    return props.items.reduce((sum, item) => {
        const price = Number(item.price.replace(/[^\d]/g, ''));
        return sum + price * item.quantity;
    }, 0).toLocaleString('vi-VN') + ' ₫';
});

const totalQuantity = computed(() => {
    return props.items.reduce((sum, item) => sum + item.quantity, 0);
});
</script>