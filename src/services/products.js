import api from "../api";

const getProducts = async () => {
  return await api.get(`/product`);
};

const getProductById = async (id) => {
  return await api.get(`/product/${id}`);
};

const createProduct = async (data) => {
  return await api.post(`/product`, data);
};

const deleteProduct = async (id) => {
  return await api.delete(`/product/${id}`);
};

const getProductsByShops = async (shopIds) => {
  return await api.get(`/product/shops?shopIds=${shopIds.join(',')}`);
};


export { getProducts, getProductById, createProduct, deleteProduct, getProductsByShops };
