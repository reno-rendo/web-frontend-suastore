import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                // Redirect to login if not on login page
                if (!window.location.pathname.includes('/auth')) {
                    window.location.href = '/auth/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

// API Functions

// Auth
export const authApi = {
    login: (data: { email: string; password: string }) =>
        api.post('/auth/login', data),
    register: (data: { email: string; password: string; fullName: string; phone?: string }) =>
        api.post('/auth/register', data),
    getProfile: () => api.get('/auth/profile'),
};

// Products
export const productsApi = {
    getAll: (params?: {
        page?: number;
        limit?: number;
        search?: string;
        categoryId?: number;
        brandId?: number;
        minPrice?: number;
        maxPrice?: number;
        sortBy?: string;
    }) => api.get('/products', { params }),
    getBySlug: (slug: string) => api.get(`/products/${slug}`),
    getFlashSale: (limit?: number) => api.get('/products/flash-sale', { params: { limit } }),
    getFeatured: (limit?: number) => api.get('/products/featured', { params: { limit } }),
    getNewArrivals: (limit?: number) => api.get('/products/new-arrivals', { params: { limit } }),
};

// Categories
export const categoriesApi = {
    getAll: () => api.get('/categories'),
    getBySlug: (slug: string) => api.get(`/categories/${slug}`),
};

// Cart
export const cartApi = {
    get: () => api.get('/cart'),
    add: (data: { productId: number; variantId?: number; quantity: number }) =>
        api.post('/cart', data),
    update: (id: number, quantity: number) => api.put(`/cart/${id}`, { quantity }),
    remove: (id: number) => api.delete(`/cart/${id}`),
    clear: () => api.delete('/cart'),
};

// Orders
export const ordersApi = {
    getAll: (status?: string) => api.get('/orders', { params: { status } }),
    getById: (id: number) => api.get(`/orders/${id}`),
    create: (data: any) => api.post('/orders', data),
};

// Wishlist
export const wishlistApi = {
    get: () => api.get('/wishlist'),
    add: (productId: number) => api.post(`/wishlist/${productId}`),
    remove: (productId: number) => api.delete(`/wishlist/${productId}`),
    check: (productId: number) => api.get(`/wishlist/${productId}/check`),
};

// Stores
export const storesApi = {
    getBySlug: (slug: string) => api.get(`/stores/${slug}`),
    getProducts: (slug: string, params?: { page?: number; limit?: number }) =>
        api.get(`/stores/${slug}/products`, { params }),
};

// Reviews
export const reviewsApi = {
    getProductReviews: (productId: number, params?: { page?: number; limit?: number }) =>
        api.get(`/reviews/product/${productId}`, { params }),
    create: (productId: number, data: { rating: number; comment?: string }) =>
        api.post(`/reviews/product/${productId}`, data),
};

// Payment
export const paymentApi = {
    getMethods: () => api.get('/payment/methods'),
    createInvoice: (orderId: number) => api.post('/payment/invoice', { orderId }),
    createVirtualAccount: (orderId: number, bankCode: string) =>
        api.post('/payment/virtual-account', { orderId, bankCode }),
    createEwallet: (orderId: number, channelCode: string, mobileNumber?: string) =>
        api.post('/payment/ewallet', { orderId, channelCode, mobileNumber }),
    createQRIS: (orderId: number) => api.post('/payment/qris', { orderId }),
    getStatus: (orderId: number) => api.get(`/payment/status/${orderId}`),
};

export default api;

