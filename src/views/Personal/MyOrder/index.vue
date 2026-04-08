<template>
    <a-tabs v-model:activeKey="activeKey" centered @tabClick="handleChange"
        style="border-top-left-radius: 8px; border-top-right-radius: 8px; background-color: #fff;">
        <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.label" />
    </a-tabs>

    <div class="orders-list">
        <MyOrderItem v-for="(o, i) in orders" :key="i" :order="o" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyOrderItem from '../../../components/Personal/MyOrderItem.vue';

const activeKey = ref('CONFIRMED');

const tabs = [
    { key: 'CONFIRMED', label: 'Đã giao' },
    { key: 'PENDING', label: 'Chờ giao' },
    { key: 'CANCELLED', label: 'Đã hủy' },
];

const orders = ref([
    {
        date: '19/12/2025',
        delivery: 'Giao hàng tận nơi',
        number: '6882850',
        status: 'delivered',
        statusText: 'Đã giao',
        items: [],
        total: 76870,
    },
    {
        date: '02/12/2025',
        delivery: 'Nhận tại cửa hàng',
        number: '7870353',
        status: 'delivered',
        statusText: 'Đã giao',
        items: [
            { img: '/P08458_1.avif', title: 'Nhỏ mắt V.Rohto Dryeye 13ml hỗ trợ bôi trơn mắt', price: 57600, qty: 1 },
        ],
        total: 80100,
    },
]);

const handleChange = (status: string) => {
    activeKey.value = status;
};
</script>

<style scoped>
:deep(.ant-tabs-nav) {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 0 !important;
}

.orders-list {
    margin-top: 12px
}
</style>
