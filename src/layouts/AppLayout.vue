<template>
    <a-config-provider :theme="{ token: { colorPrimary: '#52c41a' } }">
        <div>
            <Header />
            <Navbar/>
            <Banner />
            <div class="px-2 py-3 w-6xl mr-auto ml-auto">
                <router-view></router-view>
            </div>
        </div>
    </a-config-provider>
</template>

<script setup lang="ts">
import Banner from '@/components/Banner/Banner.vue';
import Header from '@/components/Header/Header.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { theme } from 'ant-design-vue';
</script>

<style scoped>

</style>