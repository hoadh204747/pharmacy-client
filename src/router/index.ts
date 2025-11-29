import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailLayout from '@/layouts/DetailLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { loadLayoutMiddleware } from './middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: AppLayout,
        title: 'Home - Pharmacy Management System',
      },
    },
    {
      path: '/products/by-category/:categoryId',
      name: 'products',
      component: () => import('../views/Products/ProductsView.vue'),
      meta: {
        layout: DetailLayout,
        title: 'Products - Pharmacy Management System',
      },
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('@/views/Products/_id/ProductView.vue'),
      meta: {
        layout: DetailLayout,
        title: 'Product Detail - Pharmacy Management System',
      },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart/CartView.vue'),
      meta: {
        layout: DetailLayout,
        title: 'Cart - Pharmacy Management System',
      },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/Checkout/CheckoutView.vue'),
      meta: {
        layout: DetailLayout,
        title: 'Checkout - Pharmacy Management System',
      },
    },
  ],
})

router.beforeEach(loadLayoutMiddleware)
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title'
  next()
})

export default router
