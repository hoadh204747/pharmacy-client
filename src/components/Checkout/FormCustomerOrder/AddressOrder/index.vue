<template>
    <div class="address-form">
        <h3 class="form-title">Địa chỉ nhận hàng</h3>

        <div class="form-group">
            <label class="form-label">Tỉnh / Thành phố <span class="required">*</span></label>
            <a-select v-model:value="checkoutStore.addressInfo.province" placeholder="Chọn tỉnh / thành phố"
                :options="provinceOptions" :filter-option="filterOption" show-search @change="onProvinceChange"
                class="w-full" />
            <span v-if="errors.province" class="error-message">{{ errors.province }}</span>
        </div>

        <div class="form-group">
            <label class="form-label">Quận / Huyện <span class="required">*</span></label>
            <a-select v-model:value="checkoutStore.addressInfo.district" placeholder="Chọn quận / huyện"
                :options="districtOptions" :filter-option="filterOption" show-search
                :disabled="!checkoutStore.addressInfo.province" @change="onDistrictChange" class="w-full" />
            <span v-if="errors.district" class="error-message">{{ errors.district }}</span>
        </div>

        <div class="form-group">
            <label class="form-label">Phường / Xã <span class="required">*</span></label>
            <a-select v-model:value="checkoutStore.addressInfo.ward" placeholder="Chọn phường / xã"
                :options="wardOptions" :filter-option="filterOption" show-search
                :disabled="!checkoutStore.addressInfo.district" @change="validateForm" class="w-full" />
            <span v-if="errors.ward" class="error-message">{{ errors.ward }}</span>
        </div>

        <div class="form-group">
            <label class="form-label">Địa chỉ cụ thể <span class="required">*</span></label>
            <a-input v-model:value="checkoutStore.addressInfo.address" placeholder="Nhập số nhà, tên đường..."
                allow-clear @change="validateForm" />
            <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCheckoutStore } from '@/stores/checkoutStore';

interface SelectOption {
    label: string;
    value: string;
}

interface Errors {
    province?: string;
    district?: string;
    ward?: string;
    address?: string;
}

const checkoutStore = useCheckoutStore();
const errors = ref<Errors>({});

// Mock data - Thay bằng API thực tế
const provinceOptions: SelectOption[] = [
    { label: 'Hà Nội', value: '01' },
    { label: 'TP. Hồ Chí Minh', value: '02' },
    { label: 'Đà Nẵng', value: '03' },
    { label: 'Hải Phòng', value: '04' },
    { label: 'Cần Thơ', value: '05' },
    { label: 'Quảng Ninh', value: '06' },
    { label: 'Bắc Ninh', value: '07' },
    { label: 'Hưng Yên', value: '08' },
];

// Mock data - Thay bằng API thực tế
const districtDataMap: { [key: string]: SelectOption[] } = {
    '01': [
        { label: 'Quận Ba Đình', value: '0101' },
        { label: 'Quận Hoàn Kiếm', value: '0102' },
        { label: 'Quận Tây Hồ', value: '0103' },
        { label: 'Quận Cầu Giấy', value: '0104' },
        { label: 'Quận Đống Đa', value: '0105' },
        { label: 'Quận Hai Bà Trưng', value: '0106' },
    ],
    '02': [
        { label: 'Quận 1', value: '0201' },
        { label: 'Quận 2', value: '0202' },
        { label: 'Quận 3', value: '0203' },
        { label: 'Quận 4', value: '0204' },
        { label: 'Quận 5', value: '0205' },
        { label: 'Quận 7', value: '0207' },
    ],
    '03': [
        { label: 'Quận Hải Châu', value: '0301' },
        { label: 'Quận Thanh Khê', value: '0302' },
        { label: 'Quận Sơn Trà', value: '0303' },
        { label: 'Quận Ngũ Hành Sơn', value: '0304' },
    ],
    '04': [
        { label: 'Quận Hồng Bàng', value: '0401' },
        { label: 'Quận Ngô Quyền', value: '0402' },
        { label: 'Quận Lê Chân', value: '0403' },
    ],
    '05': [
        { label: 'Quận Ninh Kiều', value: '0501' },
        { label: 'Quận Bình Thủy', value: '0502' },
        { label: 'Quận Ô Môn', value: '0503' },
    ],
    '06': [
        { label: 'Quận Hạ Long', value: '0601' },
        { label: 'Quận Cẩm Phả', value: '0602' },
    ],
    '07': [
        { label: 'Quận Bắc Ninh', value: '0701' },
        { label: 'Quận Từ Sơn', value: '0702' },
    ],
    '08': [
        { label: 'Quận Hưng Yên', value: '0801' },
        { label: 'Quận Mỹ Hào', value: '0802' },
    ],
};

const wardDataMap: { [key: string]: SelectOption[] } = {
    '0101': [
        { label: 'Phường Phúc Tân', value: '010101' },
        { label: 'Phường Nguyễn Trung Trực', value: '010102' },
        { label: 'Phường Bạch Đằng', value: '010103' },
        { label: 'Phường Kim Mã', value: '010104' },
    ],
    '0102': [
        { label: 'Phường Hàng Bạc', value: '010201' },
        { label: 'Phường Hàng Mã', value: '010202' },
        { label: 'Phường Cửa Đông', value: '010203' },
        { label: 'Phường Lý Thái Tổ', value: '010204' },
    ],
    '0103': [
        { label: 'Phường Quảng An', value: '010301' },
        { label: 'Phường Tây Hồ', value: '010302' },
        { label: 'Phường Bưởi', value: '010303' },
    ],
    '0104': [
        { label: 'Phường Dịch Vọng', value: '010401' },
        { label: 'Phường Yên Phụ', value: '010402' },
        { label: 'Phường Láng Hạ', value: '010403' },
    ],
    // Thêm dữ liệu cho các quận khác...
};

// Custom filter function để search
const filterOption = (input: string, option: SelectOption) => {
    return option.label.toLowerCase().includes(input.toLowerCase());
};

const districtOptions = computed(() => {
    return districtDataMap[checkoutStore.addressInfo.province] || [];
});

const wardOptions = computed(() => {
    return wardDataMap[checkoutStore.addressInfo.district] || [];
});

const onProvinceChange = () => {
    // Reset district và ward khi thay đổi province
    checkoutStore.addressInfo.district = '';
    checkoutStore.addressInfo.ward = '';
    errors.value.district = undefined;
    errors.value.ward = undefined;
};

const onDistrictChange = () => {
    // Reset ward khi thay đổi district
    checkoutStore.addressInfo.ward = '';
    errors.value.ward = undefined;
};

const validateForm = (): boolean => {
    errors.value = {};

    if (!checkoutStore.addressInfo.province) {
        errors.value.province = 'Vui lòng chọn tỉnh / thành phố';
    }

    if (!checkoutStore.addressInfo.district) {
        errors.value.district = 'Vui lòng chọn quận / huyện';
    }

    if (!checkoutStore.addressInfo.ward) {
        errors.value.ward = 'Vui lòng chọn phường / xã';
    }

    if (!checkoutStore.addressInfo.address?.trim()) {
        errors.value.address = 'Vui lòng nhập địa chỉ cụ thể';
    } else if (checkoutStore.addressInfo.address.length < 5) {
        errors.value.address = 'Địa chỉ phải có ít nhất 5 ký tự';
    }

    return Object.keys(errors.value).length === 0;
};
</script>

<style scoped>
.address-form {
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

.form-group {
    margin-bottom: 16px;
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
}

.form-actions :deep(.ant-btn-primary) {
    background: #8b5cf6;
    border-color: #8b5cf6;
}

.form-actions :deep(.ant-btn-primary:hover) {
    background: #7c3aed;
    border-color: #7c3aed;
}

/* Select styling */
:deep(.ant-select-selector) {
    border-radius: 6px !important;
    border-color: #d1d5db !important;
    transition: all 0.2s ease;
}

:deep(.ant-select-selector:hover) {
    border-color: #8b5cf6 !important;
}

:deep(.ant-select-focused .ant-select-selector) {
    border-color: #8b5cf6 !important;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1) !important;
}

/* Input styling */
:deep(.ant-input) {
    border-radius: 6px;
    border-color: #d1d5db;
    transition: all 0.2s ease;
}

:deep(.ant-input:hover) {
    border-color: #8b5cf6;
}

:deep(.ant-input:focus) {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
    .address-form {
        padding: 16px;
    }

    .form-title {
        font-size: 16px;
        margin-bottom: 16px;
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