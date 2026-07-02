import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, ProductColor, ProductSize, CartItem, WishlistItem } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity: number, color: ProductColor, size: ProductSize) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  getTotal: () => number
  getItemCount: () => number
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

interface FilterStore {
  viewMode: 'grid' | 'list'
  categories: string[]
  colors: string[]
  sizes: string[]
  priceRange: [number, number]
  rating: number | null
  sort: 'newest' | 'popularity' | 'price-asc' | 'price-desc'
  setViewMode: (mode: 'grid' | 'list') => void
  toggleCategory: (category: string) => void
  toggleColor: (color: string) => void
  toggleSize: (size: string) => void
  setPriceRange: (range: [number, number]) => void
  setRating: (rating: number | null) => void
  setSort: (sort: 'newest' | 'popularity' | 'price-asc' | 'price-desc') => void
  resetFilters: () => void
}

const defaultFilterState = {
  viewMode: 'grid' as const,
  categories: [],
  colors: [],
  sizes: [],
  priceRange: [0, 1000] as [number, number],
  rating: null,
  sort: 'newest' as const,
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity, color, size) => {
        const items = get().items
        const existingId = `${product.id}-${color.id}-${size.id}`
        const existing = items.find(item => item.id === existingId)

        if (existing) {
          set({
            items: items.map(item =>
              item.id === existingId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                id: existingId,
                product,
                quantity,
                color,
                size,
              },
            ],
          })
        }
        set({ isOpen: true })
      },

      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setCartOpen: (open) => set({ isOpen: open }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'luxury-cart',
    }
  )
)

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items
        if (!items.find(item => item.product.id === product.id)) {
          set({
            items: [
              ...items,
              {
                id: product.id,
                product,
                created_at: new Date().toISOString(),
              },
            ],
          })
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.product.id !== productId) })
      },

      isInWishlist: (productId) => {
        return get().items.some(item => item.product.id === productId)
      },
    }),
    {
      name: 'luxury-wishlist',
    }
  )
)

export const useFilterStore = create<FilterStore>((set) => ({
  ...defaultFilterState,

  setViewMode: (mode) => set({ viewMode: mode }),
  toggleCategory: (category) => {
    const categories = useFilterStore.getState().categories
    if (categories.includes(category)) {
      set({ categories: categories.filter(c => c !== category) })
    } else {
      set({ categories: [...categories, category] })
    }
  },
  toggleColor: (color) => {
    const colors = useFilterStore.getState().colors
    if (colors.includes(color)) {
      set({ colors: colors.filter(c => c !== color) })
    } else {
      set({ colors: [...colors, color] })
    }
  },
  toggleSize: (size) => {
    const sizes = useFilterStore.getState().sizes
    if (sizes.includes(size)) {
      set({ sizes: sizes.filter(s => s !== size) })
    } else {
      set({ sizes: [...sizes, size] })
    }
  },
  setPriceRange: (range) => set({ priceRange: range }),
  setRating: (rating) => set({ rating }),
  setSort: (sort) => set({ sort }),
  resetFilters: () => set(defaultFilterState),
}))
