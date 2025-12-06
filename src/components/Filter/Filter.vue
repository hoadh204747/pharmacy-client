<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <span class="font-bold text-xl">Bộ lọc </span>
            <span @click="reset" class="cursor-pointer text-blue-500 hover:text-blue-600">Thiết lập lại</span>
        </div>

        <div class="mb-4">
            <span class="font-semibold">Khoảng giá</span>
            <a-input v-model:value="local.priceFrom" style="border: 1px black solid;" placeholder="Tối thiểu"
                class="mt-4">
                <template #suffix>
                    <span class="text-gray-500">đ</span>
                </template>
            </a-input>
            <a-input v-model:value="local.priceTo" style="border: 1px black solid;" placeholder="Tối đa" class="mt-3">
                <template #suffix>
                    <span class="text-gray-500">đ</span>
                </template>
            </a-input>
            <a-button @click="apply" type="primary" class="w-full mt-3">Áp dụng</a-button>
        </div>

        <div class="mb-4">
            <a-radio-group v-model:value="local.priceRange">
                <a-radio class="radioPrice" :value="1">Dưới 100.000 đ</a-radio>
                <a-radio class="radioPrice" :value="2">100.000 đ - 300.000 đ</a-radio>
                <a-radio class="radioPrice" :value="3">Trên 300.000 đ</a-radio>
            </a-radio-group>
        </div>

        <div class="">
            <p class="mb-2 font-semibold">Thương hiệu</p>
            <a-input style="border: 1px black solid;" placeholder="Nhập tên thương hiệu" />
            <div class="flex flex-col gap-2 mt-2">
                <a-checkbox-group :options="optionsFromApi" v-model:value="local.brands" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IGetBrandResponse } from '@/api/models/brand';
import { BrandService } from '@/api/services/brand';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps<{
    filters: Record<string, any>;
}>();

const emit = defineEmits(['update:filters', 'update:modelValue', 'change']);

const local = reactive({
    priceFrom: '',
    priceTo: '',
    priceRange: null as number | null,
    brands: [] as number[],
    keyword: ''
});

const initialized = ref(false);

const brandList = ref<IGetBrandResponse[]>([])

const getBrandByCategory = async () => {
    const res = await BrandService.getBrandsByCategory(Number(route.params.categoryId));
    brandList.value = res;
};
onMounted(async () => {
    await getBrandByCategory();
    // initialize from props if provided
    const initial = props.filters;
    if (initial) {
        if (initial.priceFrom !== undefined) local.priceFrom = initial.priceFrom;
        if (initial.priceTo !== undefined) local.priceTo = initial.priceTo;
        if (initial.priceRange !== undefined) local.priceRange = initial.priceRange;
        if (initial.brands !== undefined) local.brands = Array.isArray(initial.brands) ? [...initial.brands] : [];
        if (initial.keyword !== undefined) local.keyword = initial.keyword;
    }
    // allow watch to start emitting after mount
    initialized.value = true;
});
const optionsFromApi = computed(() => {
    return brandList.value.map(brand => ({
        label: brand.name,
        value: brand.id
    }));
});

watch(() => route.params.categoryId, async (newId, oldId) => {
    if (!newId || newId === oldId) return;
    await getBrandByCategory();
    // reset brand selection khi chuyển category (nếu muốn)
    local.brands = [];
    // re-emit filters so parent refetches with new category (không gửi price inputs trừ radio)
    if (initialized.value) {
        emitFilters(false);
    }
});

watch(() => local.priceRange, (val) => {
    if (val === 1) {
        local.priceFrom = '';
        local.priceTo = '100000';
    } else if (val === 2) {
        local.priceFrom = '100000';
        local.priceTo = '300000';
    } else if (val === 3) {
        local.priceFrom = '300000';
        local.priceTo = '';
    } else {
        // none
        local.priceFrom = '';
        local.priceTo = '';
    }

    // radio selection should immediately apply price filter
    if (initialized.value) {
        emitFilters(true);
    }
}, { immediate: false });

// emit current filters
const emitFilters = (includePrice = false) => {
    const payload: Record<string, any> = {
        priceRange: local.priceRange,
        brands: [...local.brands],
        keyword: local.keyword
    };
    if (includePrice) {
        payload.priceFrom = local.priceFrom;
        payload.priceTo = local.priceTo;
    }
    emit('update:filters', payload);
    emit('update:modelValue', payload);
    emit('change', payload);
}

function apply() {
    emitFilters(true);
}

function reset() {
    local.priceFrom = '';
    local.priceTo = '';
    local.priceRange = null;
    local.brands.splice(0);
    local.keyword = '';
    emitFilters(false);
}

// auto-emit when user changes controls EXCEPT raw priceFrom/priceTo changes
// watch only brands and keyword to avoid noisy emissions when user types price inputs
watch([() => local.brands, () => local.keyword], () => {
    if (!initialized.value) return;
    emitFilters(false);
}, { deep: true });
</script>

<style scoped>
.radioPrice {
    display: flex;
    height: 30px;
    line-height: 30px;
}
</style>