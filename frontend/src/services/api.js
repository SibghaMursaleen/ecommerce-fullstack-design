import axios from './axios';

/**
 * Fetch all products with optional search and category filters
 */
export const fetchProducts = async (params = {}) => {
    const { data } = await axios.get('/products', { params });
    return data;
};

/**
 * Fetch a single product by its numeric ID or MongoDB _id
 */
export const fetchProductById = async (id) => {
    const { data } = await axios.get(`/products/${id}`);
    return data;
};

/**
 * Create a new product (Admin feature)
 */
export const createProduct = async (productData) => {
    const { data } = await axios.post('/products', productData);
    return data;
};

/**
 * Update a product (Admin feature)
 */
export const updateProduct = async (id, productData) => {
    const { data } = await axios.put(`/products/${id}`, productData);
    return data;
};

/**
 * Delete a product (Admin feature)
 */
export const deleteProduct = async (id) => {
    const { data } = await axios.delete(`/products/${id}`);
    return data;
};

