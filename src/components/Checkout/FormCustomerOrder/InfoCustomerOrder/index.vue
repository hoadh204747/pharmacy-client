<template>
    <div class="info-customer-order">
        <h3 class="form-title">Thông tin người đặt hàng</h3>

        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Họ và tên <span class="required">*</span></label>
                <a-input v-model:value="checkoutStore.customerInfo.fullName" placeholder="Nhập họ và tên" allow-clear
                    @change="validateForm" />
                <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
            </div>

            <div class="form-group">
                <label class="form-label">Số điện thoại <span class="required">*</span></label>
                <a-input v-model:value="checkoutStore.customerInfo.phone" placeholder="Nhập số điện thoại" allow-clear
                    @change="validateForm" />
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
            </div>

            <div class="form-group">
                <label class="form-label">Email <span class="required">*</span></label>
                <a-input v-model:value="checkoutStore.customerInfo.email" type="email" placeholder="Nhập email"
                    allow-clear @change="validateForm" />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
        </div>

        <div class="form-group">
            <label class="form-label">Ghi chú đơn hàng <span class="optional">(Tùy chọn)</span></label>
            <a-textarea v-model:value="checkoutStore.customerInfo.note" placeholder="Nhập ghi chú (nếu có)" :rows="4"
                allow-clear />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCheckoutStore } from '@/stores/checkoutStore';

interface Errors {
    fullName?: string;
    phone?: string;
    email?: string;
}

const checkoutStore = useCheckoutStore();
const errors = ref<Errors>({});

// Validate email
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone
const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
    return phoneRegex.test(phone);
};

const validateForm = (): boolean => {
    errors.value = {};

    if (!checkoutStore.customerInfo.fullName?.trim()) {
        errors.value.fullName = 'Vui lòng nhập họ và tên';
    } else if (checkoutStore.customerInfo.fullName.length < 3) {
        errors.value.fullName = 'Họ và tên phải có ít nhất 3 ký tự';
    }

    if (!checkoutStore.customerInfo.phone?.trim()) {
        errors.value.phone = 'Vui lòng nhập số điện thoại';
    } else if (!isValidPhone(checkoutStore.customerInfo.phone)) {
        errors.value.phone = 'Số điện thoại không hợp lệ (VD: 0912345678)';
    }

    if (!checkoutStore.customerInfo.email?.trim()) {
        errors.value.email = 'Vui lòng nhập email';
    } else if (!isValidEmail(checkoutStore.customerInfo.email)) {
        errors.value.email = 'Email không hợp lệ (VD: example@mail.com)';
    }

    return Object.keys(errors.value).length === 0;
};
</script>

<style scoped>
.info-customer-order {
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

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
}

.form-group {
    margin-bottom: 16px;
}

.form-group:last-child {
    margin-bottom: 0;
}

.form-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
}

.required {
    color: #ef4444;
}

.optional {
    color: #9ca3af;
    font-weight: 400;
    font-size: 12px;
}

.error-message {
    display: block;
    font-size: 12px;
    color: #ef4444;
    margin-top: 6px;
}

.form-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #f3e8ff;
}

.form-actions :deep(.ant-btn) {
    flex: 1;
    height: 40px;
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

/* Input styling */
:deep(.ant-input),
:deep(.ant-input-textarea) {
    border-radius: 6px;
    border-color: #d1d5db !important;
    transition: all 0.2s ease;
}

:deep(.ant-input:hover),
:deep(.ant-input-textarea:hover) {
    border-color: #8b5cf6 !important;
}

:deep(.ant-input:focus),
:deep(.ant-input-textarea:focus) {
    border-color: #8b5cf6 !important;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1) !important;
}

:deep(.ant-input-textarea textarea:focus) {
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1) !important;
}

/* Responsive */
@media (max-width: 768px) {
    .info-customer-order {
        padding: 16px;
    }

    .form-title {
        font-size: 16px;
        margin-bottom: 16px;
    }

    .form-grid {
        grid-template-columns: 1fr;
        gap: 14px;
        margin-bottom: 14px;
    }

    .form-group {
        margin-bottom: 14px;
    }

    .form-actions {
        flex-direction: column;
    }

    .form-actions :deep(.ant-btn) {
        width: 100%;
    }
}
</style>