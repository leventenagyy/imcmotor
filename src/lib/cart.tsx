import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'

/**
 * Client-side cart. State lives in React + persists to localStorage. No backend.
 * Maps cleanly to a Shopify cart later (line items keyed by variant).
 * See docs/PRD.md §9.1.
 */

export interface CartItem {
  /** unique line key: `${productHandle}:${variantId}` */
  key: string
  productHandle: string
  variantId: string
  title: string
  variantTitle: string
  price: number
  imageSrc: string | null
  imageAlt: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'quantity' | 'key'>; quantity: number }
  | { type: 'UPDATE_QTY'; key: string; quantity: number }
  | { type: 'REMOVE'; key: string }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] }

const STORAGE_KEY = 'imc.cart.v1'

function lineKey(productHandle: string, variantId: string): string {
  return `${productHandle}:${variantId}`
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items }
    case 'ADD': {
      const key = lineKey(action.item.productHandle, action.item.variantId)
      const existing = state.items.find((i) => i.key === key)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + action.quantity } : i,
          ),
        }
      }
      return { items: [...state.items, { ...action.item, key, quantity: action.quantity }] }
    }
    case 'UPDATE_QTY':
      return {
        items: state.items
          .map((i) => (i.key === action.key ? { ...i, quantity: action.quantity } : i))
          .filter((i) => i.quantity > 0),
      }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.key !== action.key) }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'quantity' | 'key'>, quantity?: number) => void
  updateQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clear: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const [isOpen, setIsOpen] = useState(false)

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const items = JSON.parse(raw) as CartItem[]
        if (Array.isArray(items)) dispatch({ type: 'HYDRATE', items })
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, [])

  // Persist on change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      /* storage may be unavailable; non-fatal */
    }
  }, [state.items])

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return {
      items: state.items,
      count,
      subtotal,
      addItem: (item, quantity = 1) => {
        dispatch({ type: 'ADD', item, quantity })
        setIsOpen(true)
      },
      updateQuantity: (key, quantity) => dispatch({ type: 'UPDATE_QTY', key, quantity }),
      removeItem: (key) => dispatch({ type: 'REMOVE', key }),
      clear: () => dispatch({ type: 'CLEAR' }),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }
  }, [state.items, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}
