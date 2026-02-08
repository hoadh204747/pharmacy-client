<template>
    <div class="relative w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 overflow-hidden">
        <!-- Decorative circles -->
        <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 animate-pulse"></div>
        <div class="absolute top-1/2 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-bounce"
            style="animation-delay: 0.5s;"></div>

        <!-- Main container -->
        <div class="relative z-10 px-4 py-3 md:py-4">
            <div class="flex items-center justify-center">
                <!-- Scrolling text container -->
                <div class="flex-1 overflow-hidden">
                    <div
                        class="marquee-text text-white font-semibold text-sm md:text-base lg:text-lg whitespace-nowrap">
                        <span class="inline-block mr-6">💊 Nhà Thuốc Online - Cung cấp thuốc chất lượng cao 💊</span>
                        <span class="inline-block mr-6">✅ Sản phẩm được kiểm duyệt chặt chẽ ✅</span>
                        <span class="inline-block mr-6">🚚 Giao hàng nhanh trong 2h 🚚</span>
                        <span class="inline-block mr-6">📞 Hỗ trợ khách hàng 24/7 📞</span>
                        <span class="inline-block mr-6">💊 Nhà Thuốc Online - Cung cấp thuốc chất lượng cao 💊</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Animated shine effect -->
        <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-shine pointer-events-none">
        </div>
    </div>
</template>

<script setup lang="ts">
// No additional logic needed for introduction banner
</script>

<style scoped>
/* Marquee/Scrolling text animation */
@keyframes marquee {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

.marquee-text {
    display: flex;
    animation: marquee 25s linear infinite;
}

.marquee-text:hover {
    animation-play-state: paused;
}

/* Shine effect animation */
@keyframes shine {
    0% {
        left: -1000px;
        opacity: 0;
    }

    20% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    80% {
        opacity: 0.5;
    }

    100% {
        left: 1000px;
        opacity: 0;
    }
}

.animate-shine {
    animation: shine 4s ease-in-out infinite;
}

/* Prevent text selection on marquee */
.marquee-text {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
}
</style>
