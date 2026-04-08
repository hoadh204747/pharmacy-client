<template>
    <footer class="bg-gray-900 text-gray-100 py-12">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Footer Content -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <!-- Column 1: About -->
                <div>
                    <h3 class="text-lg font-bold mb-4 text-white">Về chúng tôi</h3>
                    <ul class="space-y-2">
                        <li>
                            <a href="#" class="hover:text-purple-400 transition">Giới thiệu</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-purple-400 transition">Hệ thống cửa hàng</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-purple-400 transition">Chính sách bảo mật</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-purple-400 transition">Điều khoản sử dụng</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-purple-400 transition">Chính sách đổi trả</a>
                        </li>
                    </ul>
                </div>

                <!-- Column 2: Categories -->
                <div>
                    <h3 class="text-lg font-bold mb-4 text-white">Danh mục</h3>
                    <ul class="space-y-2">
                        <li>
                            <a href="#" class="hover:text-purple-400 transition">Vitamin & Supplement</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-purple-400 transition">Thuốc không kê đơn</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-purple-400 transition">Sức khỏe da</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-purple-400 transition">Sản phẩm mẹ & bé</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-purple-400 transition">Thiết bị y tế</a>
                        </li>
                    </ul>
                </div>

                <!-- Column 3: Contact -->
                <div>
                    <h3 class="text-lg font-bold mb-4 text-white">Tổng đài hỗ trợ</h3>
                    <ul class="space-y-3">
                        <li class="flex items-center gap-2">
                            <i class="pi pi-phone text-purple-400"></i>
                            <span>1900 6565</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="pi pi-envelope text-purple-400"></i>
                            <a href="mailto:support@pharmacy.com"
                                class="hover:text-purple-400 transition">support@pharmacy.com</a>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="pi pi-map-pin text-purple-400 mt-1"></i>
                            <span>123 Đường Nguyễn Huệ, Q.1, TP.HCM</span>
                        </li>
                        <li class="text-sm text-gray-400 mt-4">
                            Giờ làm việc: 8:00 - 22:00 (Hàng ngày)
                        </li>
                    </ul>
                </div>

                <!-- Column 4: Social -->
                <div>
                    <h3 class="text-lg font-bold mb-4 text-white">Kết nối với chúng tôi</h3>
                    <div class="flex gap-4 mb-6">
                        <a href="#"
                            class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition">
                            <i class="pi pi-facebook text-white"></i>
                        </a>
                        <a href="#"
                            class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition">
                            <i class="pi pi-instagram text-white"></i>
                        </a>
                        <a href="#"
                            class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition">
                            <i class="pi pi-twitter text-white"></i>
                        </a>
                        <a href="#"
                            class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition">
                            <i class="pi pi-youtube text-white"></i>
                        </a>
                    </div>
                    <div>
                        <p class="text-sm text-gray-400 mb-2">Đăng ký nhận tin tức</p>
                        <div class="flex gap-2">
                            <input type="email" placeholder="Email của bạn"
                                class="flex-1 px-3 py-2 bg-gray-800 text-white rounded text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            <button
                                class="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-500 transition">
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-gray-700 pt-8">
                <!-- Footer Bottom -->
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-gray-400 text-sm">
                        &copy; 2025 Pharmacy Store. Tất cả quyền được bảo lưu.
                    </p>
                    <div class="flex gap-6 text-sm text-gray-400">
                        <a href="#" class="hover:text-purple-400 transition">Sitemap</a>
                        <a href="#" class="hover:text-purple-400 transition">Liên hệ</a>
                        <a href="#" class="hover:text-purple-400 transition">FAQ</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
</script>

<style scoped></style>