<template>
    <a-drawer :open="open" class="custom-class" root-class-name="root-class-name" :root-style="{ color: 'blue' }"
        style="color: red" title="Chọn mã khuyến mãi" placement="right" @close="close">
        <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
                <span class="font-semibold">Mã khuyến mãi</span>
            </div>
            <div class="flex flex-col gap-2">
                <input type="text" placeholder="Nhập mã khuyến mãi" class="p-2 border rounded" />
                <a-button type="primary">Áp dụng</a-button>
            </div>
        </div>
    </a-drawer>
</template>

<script setup lang="ts">

const props = defineProps<{
    open: boolean;
}>();

const emit = defineEmits(['update:open']);

function close() {
    emit('update:open', false)
}
</script>

<style scoped></style>