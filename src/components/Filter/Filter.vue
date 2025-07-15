<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <span>Sort by: </span>
            <div class="flex gap-2">
                <a-button size="small">Price des</a-button>
                <a-button size="small">Price asc</a-button>
            </div>
        </div>

        <div class="mb-4">
            <span>Price range</span>
            <a-slider v-model:value="priceRange" range :min="1000" :max="1000000" />
        </div>

        <div class="mb-4">
            <a-radio-group v-model:value="value">
                <a-radio :style="radioStyle" :value="1">Dưới 100k</a-radio>
                <a-radio :style="radioStyle" :value="2">100k - 300k</a-radio>
                <a-radio :style="radioStyle" :value="3">Trên 300k</a-radio>
                <a-radio :style="radioStyle" :value="4">
                    Bigger than:
                    <a-input v-if="value === 4" style="width: 100px; margin-left: 10px" />
                </a-radio>
            </a-radio-group>
        </div>

        <div class="">
            <p class="mb-2">Brand</p>
            <div class="flex flex-col gap-2">
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