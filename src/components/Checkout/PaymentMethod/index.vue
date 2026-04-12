<template>
    <div class="payment-method">
        <h3 class="form-title">Phương thức thanh toán</h3>

        <div class="payment-options">
            <!-- COD - Thanh toán khi nhận hàng -->
            <div class="payment-option" :class="{ active: checkoutStore.paymentMethod === EPaymentMethod.CASH }"
                @click="checkoutStore.setPaymentMethod(EPaymentMethod.CASH)">
                <div class="option-header">
                    <div class="radio-wrapper">
                        <input type="radio" id="payment-cod" :value="EPaymentMethod.CASH"
                            :checked="checkoutStore.paymentMethod === EPaymentMethod.CASH" class="radio-input" />
                        <label for="payment-cod" class="radio-label"></label>
                    </div>
                    <div class="option-info">
                        <i class="pi pi-inbox text-2xl text-orange-500"></i>
                        <div class="ml-3">
                            <h4 class="option-title">Thanh toán khi nhận hàng</h4>
                            <p class="option-desc">Thanh toán tiền mặt khi nhận hàng (COD)</p>
                        </div>
                    </div>
                </div>
                <div v-if="checkoutStore.paymentMethod === EPaymentMethod.CASH" class="option-content">
                    <p class="text-sm text-gray-600">
                        ✓ Thanh toán trực tiếp cho shipper khi nhận hàng
                    </p>
                    <p class="text-sm text-gray-600">
                        ✓ Kiểm tra hàng trước khi thanh toán
                    </p>
                    <p class="text-sm text-gray-600">
                        ✓ Không phí thanh toán thêm
                    </p>
                </div>
            </div>

            <!-- Bank Transfer - Thanh toán qua ngân hàng -->
            <div class="payment-option" :class="{ active: checkoutStore.paymentMethod === EPaymentMethod.CARD }"
                @click="checkoutStore.setPaymentMethod(EPaymentMethod.CARD)">
                <div class="option-header">
                    <div class="radio-wrapper">
                        <input type="radio" id="payment-bank" :value="EPaymentMethod.CARD"
                            :checked="checkoutStore.paymentMethod === EPaymentMethod.CARD" class="radio-input" />
                        <label for="payment-bank" class="radio-label"></label>
                    </div>
                    <div class="option-info">
                        <i class="pi pi-credit-card text-2xl text-purple-500"></i>
                        <div class="ml-3">
                            <h4 class="option-title">Thanh toán qua ngân hàng</h4>
                            <p class="option-desc">Chuyển khoản ngân hàng (ATM, Ví điện tử)</p>
                        </div>
                    </div>
                </div>
                <div v-if="checkoutStore.paymentMethod === EPaymentMethod.CARD" class="option-content">
                    <p class="text-sm text-gray-600">
                        ✓ Hỗ trợ tất cả ngân hàng tại Việt Nam
                    </p>
                    <p class="text-sm text-gray-600">
                        ✓ Hỗ trợ ví điện tử (Momo, Zalopay, VNPay)
                    </p>
                    <p class="text-sm text-gray-600">
                        ✓ Thanh toán nhanh chóng và an toàn
                    </p>
                    <div class="bank-logos mt-3">
                        <span class="bank-logo">Ngân hàng</span>
                        <span class="bank-logo">Momo</span>
                        <span class="bank-logo">Zalopay</span>
                        <span class="bank-logo">VNPay</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EPaymentMethod } from '@/api/models/order';
import { useCheckoutStore } from '@/stores/checkoutStore';

const checkoutStore = useCheckoutStore();

</script>

<style scoped>
.payment-method {
    background: white;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.08);
}

.form-title {
    font-size: 18px;
    font-weight: 700;
    color: #4c1d95;
    margin: 0 0 20px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #f3e8ff;
}

.payment-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
}

.payment-option {
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
}

.payment-option:hover {
    border-color: #d1d5db;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.payment-option.active {
    border-color: #8b5cf6;
    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.option-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
}

.radio-wrapper {
    flex-shrink: 0;
    margin-top: 2px;
}

.radio-input {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: #8b5cf6;
}

.radio-label {
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
}

.radio-input:checked+.radio-label {
    background: #8b5cf6;
    border-color: #8b5cf6;
    box-shadow: inset 0 0 0 3px white;
}

.option-info {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    flex: 1;
}

.option-title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
}

.option-desc {
    font-size: 13px;
    color: #6b7280;
    margin: 4px 0 0 0;
}

.option-content {
    padding-left: 32px;
    animation: slideDown 0.3s ease;
}

.option-content p {
    margin: 8px 0;
    line-height: 1.5;
}

.bank-logos {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.bank-logo {
    display: inline-block;
    padding: 6px 12px;
    background: #f3f4f6;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #374151;
}

.form-actions {
    display: flex;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid #f3e8ff;
}

.form-actions :deep(.ant-btn) {
    flex: 1;
    height: 44px;
    font-weight: 600;
    border-radius: 6px;
    font-size: 14px;
}

.form-actions :deep(.ant-btn-primary) {
    background: #8b5cf6;
    border-color: #8b5cf6;
}

.form-actions :deep(.ant-btn-primary:hover) {
    background: #7c3aed;
    border-color: #7c3aed;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .payment-method {
        padding: 16px;
    }

    .form-title {
        font-size: 16px;
        margin-bottom: 16px;
    }

    .payment-options {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .payment-option {
        padding: 14px;
    }

    .option-title {
        font-size: 15px;
    }

    .form-actions :deep(.ant-btn) {
        height: 40px;
        font-size: 13px;
    }
}
</style>