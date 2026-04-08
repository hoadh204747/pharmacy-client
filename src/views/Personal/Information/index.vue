<template>
    <a-card title="Thông tin cá nhân">
        <div class="flex flex-col items-center gap-4">
            <a-avatar :size="64">
                <template #icon>
                    <UserOutlined />
                </template>
            </a-avatar>
            <div>
                <div>
                    <strong>Họ và tên:</strong> Nguyễn Văn A
                </div>
                <div>
                    <strong>Email:</strong> nguyenvana@example.com
                </div>
            </div>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
</script>

<style scoped></style>