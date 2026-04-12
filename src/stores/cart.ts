import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '@/utils/index.type'

type CartStateItem = Partial<CartItem> & {
  cartQuantity: number
  addedAt: number
  checked?: boolean
}

const normalizeCartItem = (item: any): CartStateItem => ({
  id: item?.id,
  name: item?.name,
  slug: item?.slug,
  description: item?.description,
  imageUrl: Array.isArray(item?.imageUrl) ? item.imageUrl : [],
  price: typeof item?.price === 'number' ? item.price : Number(item?.price) || 0,
  discount: typeof item?.discount === 'number' ? item.discount : Number(item?.discount) || 0,
  amount: typeof item?.amount === 'number' ? item.amount : Number(item?.amount) || 0,
  sold: typeof item?.sold === 'number' ? item.sold : Number(item?.sold) || 0,
  sale: Boolean(item?.sale),
  brand: item?.brand,
  createdAt: item?.createdAt || '',
  updatedAt: item?.updatedAt || '',
  cartQuantity:
    typeof item?.cartQuantity === 'number' ? item.cartQuantity : Number(item?.cartQuantity) || 0,
  addedAt: typeof item?.addedAt === 'number' ? item.addedAt : Date.now(),
  checked: item?.checked ?? false,
})

export const useCartStore = defineStore('cart', () => {
  const CART_KEY = 'pharmacy_cart'

  const cart = ref<CartStateItem[]>([])

  const loadCart = () => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        cart.value = parsed.map((item: any) => normalizeCartItem(item))
      } else {
        cart.value = []
      }
    } catch (error) {
      console.error('Failed to load cart:', error)
      cart.value = []
    }
  }

  const saveCartToStorage = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.value))
  }

  const addToCart = (item: CartStateItem) => {
    cart.value.push(item)
    saveCartToStorage()
  }

  const updateItem = (index: number, quantity: number) => {
    if (index >= 0 && index < cart.value.length) {
      cart.value[index].cartQuantity = quantity
      saveCartToStorage()
    }
  }

  const removeFromCart = (index: number) => {
    cart.value.splice(index, 1)
    saveCartToStorage()
  }

  const toggleItemCheck = (index: number) => {
    if (index >= 0 && index < cart.value.length) {
      cart.value[index].checked = !cart.value[index].checked
      saveCartToStorage()
    }
  }

  const toggleCheckAll = (checkAll: boolean) => {
    cart.value.forEach((item) => {
      item.checked = checkAll
    })
    saveCartToStorage()
  }

  const clearCart = () => {
    cart.value = []
    saveCartToStorage()
  }

  const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.cartQuantity, 0))

  // Listen for storage changes from other tabs
  const initStorageListener = () => {
    window.addEventListener('storage', (event) => {
      if (event.key === CART_KEY && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue)
          cart.value = parsed.map((item: any) => normalizeCartItem(item))
        } catch (error) {
          console.error('Failed to parse cart from storage event:', error)
        }
      }
    })
  }

  return {
    cart,
    cartCount,
    loadCart,
    addToCart,
    updateItem,
    removeFromCart,
    toggleItemCheck,
    toggleCheckAll,
    clearCart,
    initStorageListener,
  }
})
