'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface User {
    id: number;
    email: string;
    username?: string;
    fullName: string;
    avatar?: string;
    role: string;
    isVerified: boolean;
}

interface CartItem {
    id: number;
    productId: number;
    variantId?: number;
    quantity: number;
    product: {
        id: number;
        title: string;
        price: number;
        discount: number;
        images: { url: string }[];
        store: { id: number; name: string; slug: string };
    };
    variant?: {
        id: number;
        name: string;
        value: string;
        price: number;
    };
}

interface CartStore {
    store: {
        id: number;
        name: string;
        slug: string;
    };
    items: CartItem[];
}

// Auth Store
interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            setAuth: (user, token) => {
                localStorage.setItem('accessToken', token);
                set({ user, accessToken: token, isAuthenticated: true });
            },
            logout: () => {
                localStorage.removeItem('accessToken');
                set({ user: null, accessToken: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

// Cart Store
interface CartState {
    carts: CartStore[];
    totalItems: number;
    setCarts: (carts: CartStore[]) => void;
    addItem: (item: CartItem) => void;
    updateQuantity: (itemId: number, quantity: number) => void;
    removeItem: (itemId: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    carts: [],
    totalItems: 0,
    setCarts: (carts) => {
        const totalItems = carts.reduce(
            (acc, cart) => acc + cart.items.reduce((sum, item) => sum + item.quantity, 0),
            0
        );
        set({ carts, totalItems });
    },
    addItem: (item) => {
        // This will be called after API success, then refetch cart
    },
    updateQuantity: (itemId, quantity) => {
        const carts = get().carts.map((cart) => ({
            ...cart,
            items: cart.items.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
            ),
        }));
        const totalItems = carts.reduce(
            (acc, cart) => acc + cart.items.reduce((sum, item) => sum + item.quantity, 0),
            0
        );
        set({ carts, totalItems });
    },
    removeItem: (itemId) => {
        const carts = get()
            .carts.map((cart) => ({
                ...cart,
                items: cart.items.filter((item) => item.id !== itemId),
            }))
            .filter((cart) => cart.items.length > 0);
        const totalItems = carts.reduce(
            (acc, cart) => acc + cart.items.reduce((sum, item) => sum + item.quantity, 0),
            0
        );
        set({ carts, totalItems });
    },
    clearCart: () => set({ carts: [], totalItems: 0 }),
}));

// Wishlist Store
interface WishlistState {
    items: number[]; // Product IDs
    setItems: (items: number[]) => void;
    addItem: (productId: number) => void;
    removeItem: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
    items: [],
    setItems: (items) => set({ items }),
    addItem: (productId) => set({ items: [...get().items, productId] }),
    removeItem: (productId) =>
        set({ items: get().items.filter((id) => id !== productId) }),
    isInWishlist: (productId) => get().items.includes(productId),
}));

// UI Store (for modals, sidebars, etc.)
interface UIState {
    isMobileMenuOpen: boolean;
    isCartOpen: boolean;
    isSearchOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    setCartOpen: (open: boolean) => void;
    setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    isCartOpen: false,
    isSearchOpen: false,
    setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    setCartOpen: (open) => set({ isCartOpen: open }),
    setSearchOpen: (open) => set({ isSearchOpen: open }),
}));
