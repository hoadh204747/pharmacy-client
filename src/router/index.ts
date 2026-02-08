import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailLayout from '@/layouts/DetailLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { loadLayoutMiddleware } from './middleware'
import NoneLayout from '@/layouts/NoneLayout.vue'

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
      path: '/:categoryId/products',
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
      path: '/check-out',
      name: 'checkout',
      component: () => import('@/views/Checkout/CheckoutView.vue'),
      meta: {
        layout: DetailLayout,
        title: 'Checkout - Pharmacy Management System',
      },
    },
    {
      path: '/ca-nhan',
      name: 'personal-info',
      component: () => import('@/views/Personal/index.vue'),
      children: [
        {
          path: 'thong-tin',
          name: 'personal-info-detail',
          component: () => import('@/views/Personal/Information/index.vue'),
          meta: {
            layout: DetailLayout,
            title: 'Personal Information - Pharmacy Management System',
          },
        },
        {
          path: 'don-hang',
          name: 'personal-orders',
          component: () => import('@/views/Personal/MyOrder/index.vue'),
          meta: {
            layout: DetailLayout,
            title: 'Personal Orders - Pharmacy Management System',
          },
        },
      ],
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import('@/views/Error/ErrorView.vue'),
      meta: {
        layout: NoneLayout,
        title: 'Error',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error?status_code=404',
    },
  ],
})

router.beforeEach(loadLayoutMiddleware)
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title'
  next()
})

export default router
