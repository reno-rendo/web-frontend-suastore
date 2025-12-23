'use client';

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { productsApi, categoriesApi, cartApi, wishlistApi, authApi, ordersApi, storesApi, reviewsApi } from './api';
import { useAuthStore, useCartStore, useWishlistStore } from './store';

// ============================================================================
// QUERY CLIENT PROVIDER
// ============================================================================

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

// ============================================================================
// PRODUCTS HOOKS
// ============================================================================

export function useProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: number;
    brandId?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
}) {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => productsApi.getAll(params).then(res => res.data),
    });
}

export function useProduct(slug: string) {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: () => productsApi.getBySlug(slug).then(res => res.data),
        enabled: !!slug,
    });
}

export function useFlashSaleProducts(limit?: number) {
    return useQuery({
        queryKey: ['products', 'flash-sale', limit],
        queryFn: () => productsApi.getFlashSale(limit).then(res => res.data),
    });
}

export function useFeaturedProducts(limit?: number) {
    return useQuery({
        queryKey: ['products', 'featured', limit],
        queryFn: () => productsApi.getFeatured(limit).then(res => res.data),
    });
}

export function useNewArrivals(limit?: number) {
    return useQuery({
        queryKey: ['products', 'new-arrivals', limit],
        queryFn: () => productsApi.getNewArrivals(limit).then(res => res.data),
    });
}

// ============================================================================
// CATEGORIES HOOKS
// ============================================================================

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoriesApi.getAll().then(res => res.data),
    });
}

export function useCategory(slug: string) {
    return useQuery({
        queryKey: ['category', slug],
        queryFn: () => categoriesApi.getBySlug(slug).then(res => res.data),
        enabled: !!slug,
    });
}

// ============================================================================
// CART HOOKS
// ============================================================================

export function useCart() {
    const { isAuthenticated } = useAuthStore();
    const { setCarts } = useCartStore();

    return useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await cartApi.get();
            setCarts(res.data);
            return res.data;
        },
        enabled: isAuthenticated,
    });
}

export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { productId: number; variantId?: number; quantity: number }) =>
            cartApi.add(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}

export function useUpdateCartItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
            cartApi.update(id, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}

export function useRemoveCartItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => cartApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}

// ============================================================================
// WISHLIST HOOKS
// ============================================================================

export function useWishlist() {
    const { isAuthenticated } = useAuthStore();
    const { setItems } = useWishlistStore();

    return useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const res = await wishlistApi.get();
            const productIds = res.data.map((item: any) => item.productId);
            setItems(productIds);
            return res.data;
        },
        enabled: isAuthenticated,
    });
}

export function useToggleWishlist() {
    const queryClient = useQueryClient();
    const { items, addItem, removeItem } = useWishlistStore();

    return useMutation({
        mutationFn: async (productId: number) => {
            const isInWishlist = items.includes(productId);
            if (isInWishlist) {
                await wishlistApi.remove(productId);
                removeItem(productId);
            } else {
                await wishlistApi.add(productId);
                addItem(productId);
            }
            return { productId, added: !isInWishlist };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        },
    });
}

// ============================================================================
// AUTH HOOKS
// ============================================================================

export function useLogin() {
    const { setAuth } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { email: string; password: string }) =>
            authApi.login(data),
        onSuccess: (res) => {
            setAuth(res.data.user, res.data.accessToken);
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        },
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (data: { email: string; password: string; fullName: string; phone?: string }) =>
            authApi.register(data),
    });
}

export function useProfile() {
    const { isAuthenticated } = useAuthStore();

    return useQuery({
        queryKey: ['profile'],
        queryFn: () => authApi.getProfile().then(res => res.data),
        enabled: isAuthenticated,
    });
}

// ============================================================================
// ORDERS HOOKS
// ============================================================================

export function useOrders(status?: string) {
    const { isAuthenticated } = useAuthStore();

    return useQuery({
        queryKey: ['orders', status],
        queryFn: () => ordersApi.getAll(status).then(res => res.data),
        enabled: isAuthenticated,
    });
}

export function useOrder(id: number) {
    const { isAuthenticated } = useAuthStore();

    return useQuery({
        queryKey: ['order', id],
        queryFn: () => ordersApi.getById(id).then(res => res.data),
        enabled: isAuthenticated && !!id,
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => ordersApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}

// ============================================================================
// STORE HOOKS
// ============================================================================

export function useStore(slug: string) {
    return useQuery({
        queryKey: ['store', slug],
        queryFn: () => storesApi.getBySlug(slug).then(res => res.data),
        enabled: !!slug,
    });
}

export function useStoreProducts(slug: string, params?: { page?: number; limit?: number }) {
    return useQuery({
        queryKey: ['store', slug, 'products', params],
        queryFn: () => storesApi.getProducts(slug, params).then(res => res.data),
        enabled: !!slug,
    });
}

// ============================================================================
// REVIEWS HOOKS
// ============================================================================

export function useProductReviews(productId: number, params?: { page?: number; limit?: number }) {
    return useQuery({
        queryKey: ['reviews', productId, params],
        queryFn: () => reviewsApi.getProductReviews(productId, params).then(res => res.data),
        enabled: !!productId,
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, data }: { productId: number; data: { rating: number; comment?: string } }) =>
            reviewsApi.create(productId, data),
        onSuccess: (_, { productId }) => {
            queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
            queryClient.invalidateQueries({ queryKey: ['product'] });
        },
    });
}
