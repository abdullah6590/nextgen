"use client";

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from './Button';
import { vendorApi } from '../lib/vendorApi';

interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    tags?: string[];
}

interface ProductFormModalProps {
    open: boolean;
    onClose: () => void;
    editProduct?: Product | null; // When provided, modal enters edit mode
}

export function ProductFormModal({ open, onClose, editProduct }: ProductFormModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        imageUrl: '',
        tags: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isEditMode = !!editProduct;

    // Pre-fill form when editing
    useEffect(() => {
        if (editProduct) {
            setFormData({
                name: editProduct.name || '',
                description: editProduct.description || '',
                price: editProduct.price || 0,
                stock: editProduct.stock || 0,
                category: editProduct.category || '',
                imageUrl: editProduct.images?.[0] || '',
                tags: editProduct.tags?.join(', ') || ''
            });
        } else {
            setFormData({ name: '', description: '', price: 0, stock: 0, category: '', imageUrl: '', tags: '' });
        }
        setError('');
    }, [editProduct, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            stock: formData.stock,
            category: formData.category,
            images: formData.imageUrl ? [formData.imageUrl] : [],
            tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        };

        try {
            if (isEditMode) {
                await vendorApi.updateProduct(editProduct!._id, payload);
            } else {
                await vendorApi.addProduct({ ...payload, imageUrl: formData.imageUrl });
            }
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.error || `Failed to ${isEditMode ? 'update' : 'add'} product`);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Electronics', 'Audio', 'Footwear', 'Accessories', 'Peripherals', 'Monitors', 'Laptops', 'Wearables', 'Cameras', 'Smart Home', 'Bags', 'Watches', 'Lenses', 'Lighting', 'Drones', 'Other'];

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-lg bg-[#1c1b1d] rounded-[24px] p-8 border border-cyan-500/10 shadow-[0_0_80px_-20px_rgba(76,215,246,0.1)]">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <Dialog.Title className="text-xl font-bold font-headline uppercase tracking-tight text-on-surface">
                                {isEditMode ? 'Edit Product' : 'Deploy New Asset'}
                            </Dialog.Title>
                            <p className="text-[10px] text-primary/70 uppercase tracking-widest mt-1">
                                {isEditMode ? 'Update product details' : 'Add to your inventory'}
                            </p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 transition-all">
                            <span className="material-symbols-outlined text-on-surface-variant text-sm">close</span>
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs uppercase tracking-widest font-bold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-[#0e0e10] rounded-xl p-3 border border-outline-variant/20 text-on-surface text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                placeholder="Enter product name..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-[#0e0e10] rounded-xl p-3 border border-outline-variant/20 text-on-surface text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                rows={3}
                                placeholder="Product description..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full bg-[#0e0e10] rounded-xl p-3 border border-outline-variant/20 text-on-surface text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="w-full bg-[#0e0e10] rounded-xl p-3 border border-outline-variant/20 text-on-surface text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-[#0e0e10] rounded-xl p-3 border border-outline-variant/20 text-on-surface text-sm focus:outline-none focus:border-primary/50 transition-colors"
                            >
                                <option value="">Select category...</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full bg-[#0e0e10] rounded-xl p-3 border border-outline-variant/20 text-on-surface text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Tags (comma-separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full bg-[#0e0e10] rounded-xl p-3 border border-outline-variant/20 text-on-surface text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                placeholder="e.g. wireless, bluetooth, premium"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/10">
                            <Button variant="secondary" onClick={onClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="submit" loading={loading}>
                                {isEditMode ? 'Update Product' : 'Deploy Asset'}
                            </Button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}