import axios from 'axios';

// Route through the API Gateway — NOT directly to product-service
const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_GATEWAY_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add authentication interceptor
api.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid — redirect to login
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const vendorApi = {
    // Vendor's own products — GET /products/vendor
    getProducts: async () => {
        const response = await api.get('/products/vendor');
        return response.data;
    },

    // Update a vendor's product — PATCH /products/vendor/:id
    updateProduct: async (id: string, data: any) => {
        const response = await api.patch(`/products/vendor/${id}`, data);
        return response.data;
    },

    // Create a new product — POST /products (vendorId added by backend from JWT)
    addProduct: async (data: any) => {
        const payload = {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category: data.category,
            images: data.imageUrl ? [data.imageUrl] : [],
            tags: data.tags || [],
        };
        const response = await api.post('/products', payload);
        return response.data;
    },

    // Get vendor's orders — GET /orders/vendor/orders
    getVendorOrders: async () => {
        const response = await api.get('/orders/vendor/orders');
        return response.data;
    },

    // Get single product details — GET /products/:id
    getProduct: async (id: string) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
};