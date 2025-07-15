<template>
    <a-config-provider :theme="{ token: { colorPrimary: '#52c41a' } }">
        <div>
            <Header />
            <Navbar/>
            <div class="py-3 w-6xl mr-auto ml-auto">
                <router-view></router-view>
            </div>
        </div>
    </a-config-provider>
</template>

<script setup lang="ts">
import Header from '@/components/Header/Header.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
</script>

<style scoped>

</style>