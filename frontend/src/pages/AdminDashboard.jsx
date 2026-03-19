import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const { formatPrice } = useCurrency();

    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        id: Date.now(),
        title: '',
        category: 'Electronics',
        price: '',
        stock: '',
        image: '/assets/iphone.png',
        description: '',
        brand: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            id: product.id,
            title: product.title,
            category: product.category,
            price: product.price,
            stock: product.stock,
            image: product.image,
            description: product.description || '',
            brand: product.brand || ''
        });
        setShowModal(true);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                const { data } = await axios.put(`/products/${editingProduct._id}`, formData);
                setProducts(products.map(p => p._id === editingProduct._id ? data : p));
            } else {
                // Calculate next sequential ID if using simple numbers
                const maxId = products.length > 0 ? Math.max(...products.map(p => p.id || 0)) : 0;
                const newProductData = { ...formData, id: maxId + 1 };
                
                const { data } = await axios.post('/products', newProductData);
                setProducts([...products, data]);
            }

            setShowModal(false);
            setEditingProduct(null);
            setFormData({
                id: Date.now(),
                title: '',
                category: 'Electronics',
                price: '',
                stock: '',
                image: '/assets/iphone.png',
                description: '',
                brand: ''
            });
        } catch (err) {
            alert('Failed to save product');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    if (loading) return <div className="p-10 text-center text-[#8B96A5]">Loading Admin Panel...</div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1C1C1C]">Admin Dashboard</h1>
                    <p className="text-[#8B96A5] mt-1">Manage your product catalog and store settings</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                    <span className="material-icons text-[20px]">add</span>
                    Add New Product
                </button>
            </div>

            {/* Add Product Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowModal(false); setEditingProduct(null); }}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto font-sans">
                        <div className="p-6 border-b border-[#DEE2E7] flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-[#1C1C1C]">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button onClick={() => { setShowModal(false); setEditingProduct(null); }} className="text-[#8B96A5] hover:text-[#1C1C1C]">
                                <span className="material-icons">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddProduct} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* ... (form fields stay the same) ... */}
                            {/* (truncated for brevity, but I must provide the full form content or use multiple chunks) */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-1.5 opacity-80">Product Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-[#DEE2E7] outline-none focus:border-primary" placeholder="Enter product name" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 opacity-80">Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-[#DEE2E7] outline-none focus:border-primary bg-white">
                                    <option value="Electronics">Electronics</option>
                                    <option value="Home & Garden">Home & Garden</option>
                                    <option value="Appliances">Appliances</option>
                                    <option value="Clothing & Apparel">Clothing & Apparel</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 opacity-80">Brand</label>
                                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-[#DEE2E7] outline-none focus:border-primary" placeholder="Apple, Sony, etc." />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 opacity-80">Price (PKR)</label>
                                <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-[#DEE2E7] outline-none focus:border-primary" placeholder="e.g. 50000" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 opacity-80">Stock Units</label>
                                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-[#DEE2E7] outline-none focus:border-primary" placeholder="e.g. 100" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-1.5 opacity-80">Image Path</label>
                                <input type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-[#DEE2E7] outline-none focus:border-primary" placeholder="/assets/image-name.png" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-1.5 opacity-80">Short Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-2.5 rounded-lg border border-[#DEE2E7] outline-none focus:border-primary" placeholder="Briefly describe the product"></textarea>
                            </div>
                            <div className="md:col-span-2 pt-4 border-t border-[#DEE2E7] flex justify-end gap-3">
                                <button type="button" onClick={() => { setShowModal(false); setEditingProduct(null); }} className="px-6 py-2.5 rounded-lg font-bold text-[#8B96A5] hover:bg-gray-100">Cancel</button>
                                <button type="submit" className="px-8 py-2.5 rounded-lg font-bold bg-primary text-white hover:bg-blue-700 shadow-md">
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">{error}</div>}

            <div className="bg-white border border-[#DEE2E7] rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#F7FAFC] border-b border-[#DEE2E7]">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-[#8B96A5] uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#8B96A5] uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#8B96A5] uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#8B96A5] uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#8B96A5] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F3F5]">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg border border-[#DEE2E7] p-1 flex items-center justify-center bg-white overflow-hidden shrink-0">
                                                <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#1C1C1C] line-clamp-1">{product.title}</p>
                                                <p className="text-xs text-[#8B96A5]">ID: {product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#EEEEEE] text-[#505050]">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-[#1C1C1C]">
                                        {formatPrice(product.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <span className="text-sm text-[#505050]">{product.stock} units</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleEdit(product)}
                                                className="p-2 text-[#8B96A5] hover:text-primary transition-colors"
                                            >
                                                <span className="material-icons text-[20px]">edit</span>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-[#8B96A5] hover:text-red-500 transition-colors"
                                            >
                                                <span className="material-icons text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
