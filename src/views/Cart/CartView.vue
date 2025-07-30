<template>
    <div class="cart-view">
        <div class="cart-left">
            <div class="p-3">
                <div class="flex justify-between items-center">
                    <h3 class="text-2xl font-bold">Cart (3)</h3>
                    <button class="text-blue-600 cursor-pointer">Delete</button>
                </div>
                <div class="grid gap-2 md:gap-6">
                    <div class="mt-4 p-4 bg-[rgb(255,241,184)] rounded">
                        <p>Free shipping for all orders from 0 VNDds</p>
                    </div>
                    <div class="grid gap-4">
                        <div class="hidden grid-cols-[calc(16rem/16)_1fr_calc(24rem/16)] items-center gap-4 md:grid">
                            <a-checkbox></a-checkbox>
                            <div class="flex items-center space-x-4 justify-between">
                                <div class="grid flex-1 items-start gap-2">
                                    <p class="text-sm leading-4 text-neutral-900">Product</p>
                                </div>
                                <div class="flex justify-center space-x-4">
                                    <p class="w-[calc(160rem/16)] text-center text-sm text-neutral-900">Price</p>
                                    <p class="w-[calc(117rem/16)] text-center text-sm text-neutral-900">Count</p>
                                    <p class="w-[calc(120rem/16)] text-end text-sm text-neutral-900">Total money</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-[hsl(0,0%,82%)] h-[1px] hidden w-full md:block"></div>
                        <!-- item1 -->
                        <div
                            class="grid items-start justify-start gap-2 py-4 md:gap-4 md:p-0 md:grid-cols-[calc(16rem/16)_1fr_calc(24rem/16)] grid-cols-[calc(16rem/16)_1fr]">
                            <a-checkbox></a-checkbox>
                            <div class="grid grid-cols-[calc(68rem/16)_1fr] items-start gap-2">
                                <div
                                    class="relative h-[calc(68rem/16)] w-[calc(68rem/16)] rounded-sm border border-neutral-100">
                                    <a
                                        href="https://www.pharmacity.vn/mieng-dan-ha-sot-tre-em-hisamitsu-bye-bye-fever-6-mienghop.html">
                                        <img class="object-fit"
                                            src="https://production-cdn.pharmacity.io/digital/828x828/plain/e-com/images/ecommerce/P11520_1.jpg"
                                            alt="" loading="lazy" width="500" height="500"
                                            srcset="https://production-cdn.pharmacity.io/digital/96x96/plain/e-com/images/ecommerce/P11520_1.jpg 96w, https://production-cdn.pharmacity.io/digital/144x144/plain/e-com/images/ecommerce/P11520_1.jpg 144w, https://production-cdn.pharmacity.io/digital/256x256/plain/e-com/images/ecommerce/P11520_1.jpg 256w, https://production-cdn.pharmacity.io/digital/320x320/plain/e-com/images/ecommerce/P11520_1.jpg 320w, https://production-cdn.pharmacity.io/digital/375x375/plain/e-com/images/ecommerce/P11520_1.jpg 375w, https://production-cdn.pharmacity.io/digital/425x425/plain/e-com/images/ecommerce/P11520_1.jpg 425w, https://production-cdn.pharmacity.io/digital/640x640/plain/e-com/images/ecommerce/P11520_1.jpg 640w, https://production-cdn.pharmacity.io/digital/768x768/plain/e-com/images/ecommerce/P11520_1.jpg 768w, https://production-cdn.pharmacity.io/digital/828x828/plain/e-com/images/ecommerce/P11520_1.jpg 828w"
                                            sizes="(min-width: 769px) 129px, 96px">
                                    </a>
                                </div>
                                <div class="flex h-full flex-col justify-between md:flex-row md:space-x-4">
                                    <div>
                                        <a
                                            href="https://www.pharmacity.vn/mieng-dan-ha-sot-tre-em-hisamitsu-bye-bye-fever-6-mienghop.html">
                                            <p class="line-clamp-3 text-sm font-semibold text-neutral-900">Miếng dán hạ
                                                sốt
                                                cho trẻ sơ sinh Hisamitsu Bye Bye-Fever (2 miếng/gói)</p>
                                        </a>
                                    </div>
                                    <div class="flex h-fit items-center justify-between space-x-4 md:justify-center">
                                        <div
                                            class="flex flex-col justify-center md:w-[calc(160rem/16)] md:flex-row md:space-x-1">
                                            <p class="text-base font-semibold md:text-sm text-neutral-900">54.000 ₫</p>
                                        </div>
                                        <div
                                            class="flex w-[calc(117rem/16)] items-center justify-end  self-end md:justify-center md:self-center">
                                            <div>
                                                <button class="rounded-full bg-[hsl(0,0%,82%)] w-6 h-6 cursor-pointer">
                                                    <MinusOutlined class="text-xs" />
                                                </button>
                                                <input type="text" class="w-12 text-center" value="2">
                                                <button class="rounded-full bg-[hsl(0,0%,82%)] w-6 h-6 cursor-pointer">
                                                    <PlusOutlined class="text-xs" />
                                                </button>
                                            </div>
                                        </div>
                                        <div class="hidden w-[calc(120rem/16)] items-center justify-end md:flex">
                                            <p class="text-base font-semibold md:text-sm text-neutral-900">108.000 ₫</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button>
                                <DeleteFilled />
                            </button>
                        </div>
                        <!-- item2 -->
                        <div
                            class="grid items-start justify-start gap-2 py-4 md:gap-4 md:p-0 md:grid-cols-[calc(16rem/16)_1fr_calc(24rem/16)] grid-cols-[calc(16rem/16)_1fr]">
                            <a-checkbox></a-checkbox>
                            <div class="grid grid-cols-[calc(68rem/16)_1fr] items-start gap-2">
                                <div
                                    class="relative h-[calc(68rem/16)] w-[calc(68rem/16)] rounded-sm border border-neutral-100">
                                    <a
                                        href="https://www.pharmacity.vn/mieng-dan-ha-sot-tre-em-hisamitsu-bye-bye-fever-6-mienghop.html">
                                        <img class="object-fit"
                                            src="https://production-cdn.pharmacity.io/digital/828x828/plain/e-com/images/ecommerce/P11520_1.jpg"
                                            alt="" loading="lazy" width="500" height="500"
                                            srcset="https://production-cdn.pharmacity.io/digital/96x96/plain/e-com/images/ecommerce/P11520_1.jpg 96w, https://production-cdn.pharmacity.io/digital/144x144/plain/e-com/images/ecommerce/P11520_1.jpg 144w, https://production-cdn.pharmacity.io/digital/256x256/plain/e-com/images/ecommerce/P11520_1.jpg 256w, https://production-cdn.pharmacity.io/digital/320x320/plain/e-com/images/ecommerce/P11520_1.jpg 320w, https://production-cdn.pharmacity.io/digital/375x375/plain/e-com/images/ecommerce/P11520_1.jpg 375w, https://production-cdn.pharmacity.io/digital/425x425/plain/e-com/images/ecommerce/P11520_1.jpg 425w, https://production-cdn.pharmacity.io/digital/640x640/plain/e-com/images/ecommerce/P11520_1.jpg 640w, https://production-cdn.pharmacity.io/digital/768x768/plain/e-com/images/ecommerce/P11520_1.jpg 768w, https://production-cdn.pharmacity.io/digital/828x828/plain/e-com/images/ecommerce/P11520_1.jpg 828w"
                                            sizes="(min-width: 769px) 129px, 96px">
                                    </a>
                                </div>
                                <div class="flex h-full flex-col justify-between md:flex-row md:space-x-4">
                                    <div>
                                        <a
                                            href="https://www.pharmacity.vn/mieng-dan-ha-sot-tre-em-hisamitsu-bye-bye-fever-6-mienghop.html">
                                            <p class="line-clamp-3 text-sm font-semibold text-neutral-900">Miếng dán hạ
                                                sốt
                                                cho trẻ sơ sinh Hisamitsu Bye Bye-Fever (2 miếng/gói)</p>
                                        </a>
                                    </div>
                                    <div class="flex h-fit items-center justify-between space-x-4 md:justify-center">
                                        <div
                                            class="flex flex-col justify-center md:w-[calc(160rem/16)] md:flex-row md:space-x-1">
                                            <p class="text-base font-semibold md:text-sm text-neutral-900">54.000 ₫</p>
                                        </div>
                                        <div
                                            class="flex w-[calc(117rem/16)] items-center justify-end  self-end md:justify-center md:self-center">
                                            <div>
                                                <button class="rounded-full bg-[hsl(0,0%,82%)] w-6 h-6 cursor-pointer">
                                                    <MinusOutlined class="text-xs" />
                                                </button>
                                                <input type="text" class="w-12 text-center" value="2">
                                                <button class="rounded-full bg-[hsl(0,0%,82%)] w-6 h-6 cursor-pointer">
                                                    <PlusOutlined class="text-xs" />
                                                </button>
                                            </div>
                                        </div>
                                        <div class="hidden w-[calc(120rem/16)] items-center justify-end md:flex">
                                            <p class="text-base font-semibold md:text-sm text-neutral-900">108.000 ₫</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button>
                                <DeleteFilled />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cart-right flex flex-col space-y-4">
            <div>
                <div class="bg-white p-4 rounded-sm">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-2">
                            <DeleteFilled />
                            <span>Promo code</span>
                        </div>
                        <div>
                            <button class="text-blue-600 cursor-pointer">Selected code</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div
                    class="grid grid-flow-col items-center gap-2 rounded-sm bg-white md:grid-flow-row md:items-start md:gap-4 md:p-4">
                    <div class="grid gap-4">
                        <div class="hidden grid-flow-col items-center justify-between gap-2 md:grid">
                            <p class="text-sm text-neutral-900">provisional</p>
                            <p class="text-sm font-semibold text-neutral-900">180.000 ₫</p>
                        </div>
                        <div class="hidden grid-flow-col items-center justify-between gap-2 md:grid">
                            <p class="text-sm text-neutral-900">discount offer</p>
                            <p class="text-sm font-semibold text-neutral-900">-</p>
                        </div>
                        <div class="hidden grid-flow-col items-center justify-between gap-2 md:grid">
                            <p class="text-sm text-neutral-900">discount offer</p>
                            <p class="text-sm font-semibold text-neutral-900">-</p>
                        </div>
                        <div class="bg-[hsl(0,0%,82%)] h-[1px] hidden w-full md:block"></div>
                        <div
                            class="grid items-center justify-items-end gap-0.5 md:grid-flow-col md:justify-between md:gap-2">
                            <p class="text-sm text-neutral-900 md:text-base md:font-semibold">Total</p>
                            <p class="text-xl font-bold leading-8 text-red-500 no-underline md:text-2xl">180.000 ₫</p>
                        </div>
                    </div>
                    <a-button type="primary">Purchase (2)</a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DeleteFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
.cart-view {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(220px, 320px);
    gap: 24px;
    padding: 16px;
}

.cart-right {
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    padding: 12px;
}

.cart-left {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 12px;
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