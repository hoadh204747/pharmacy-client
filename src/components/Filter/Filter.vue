<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <span class="font-bold text-xl">Bộ lọc </span>
            <span class="cursor-pointer text-blue-500 hover:text-blue-600">Thiết lập lại</span>
        </div>

        <div class="mb-4">
            <span class="font-semibold">Khoảng giá</span>
            <a-input style="border: 1px black solid;" placeholder="Tối thiểu" class="mt-4">
                <template #suffix>
                    <span class="text-gray-500">đ</span>
                </template>
            </a-input>
            <a-input style="border: 1px black solid;" placeholder="Tối đa" class="mt-3">
                <template #suffix>
                    <span class="text-gray-500">đ</span>
                </template>
            </a-input>
            <a-button type="primary" class="w-full mt-3">Áp dụng</a-button>
        </div>

        <div class="mb-4">
            <a-radio-group v-model:value="value">
                <a-radio :style="radioStyle" :value="1">Dưới 100.000 đ</a-radio>
                <a-radio :style="radioStyle" :value="2">100.000 đ - 300.000 đ</a-radio>
                <a-radio :style="radioStyle" :value="3">Trên 300.000 đ</a-radio>
            </a-radio-group>
        </div>

        <div class="">
            <p class="mb-2 font-semibold">Thương hiệu</p>
            <a-input style="border: 1px black solid;" placeholder="Nhập tên thương hiệu" />
            <div class="flex flex-col gap-2 mt-2">
                <a-checkbox v-for="option in options" :key="option.value" v-model:checked="state">
                    {{ option.label }}
                </a-checkbox>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
const value = ref<number>(1);
const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
});

const priceRange = ref([50000, 500000]);
const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];
const state = ref('')
</script>

<style scoped></style>