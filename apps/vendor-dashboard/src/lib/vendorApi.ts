import axios from 'axios';

const VENDOR_API_URL = process.env.NEXT_PUBLIC_VENDOR_API_URL || 'http://localhost:3002';

const api = axios.create({
    baseURL: VENDOR_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add authentication interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const vendorApi = {
    getProducts: async () => {
        const response = await api.get('/vendor');
        return response.data;
    },

    updateProduct: async (id: string, data: any) => {
        const response = await api.patch(`/vendor/${id}`, data);
        return response.data;
    },

    addProduct: async (data: any) => {
        const response = await api.post('/vendor', data);
        return response.data;
    },

    getRevenueData: async () => {
        const response = await api.get('/vendor/revenue');
        return response.data;
    },

    getRecentOrders: async () => {
        const response = await api.get('/vendor/orders/recent');
        return response.data;
    }
};