import api from "../api";

const getShops = async () => {
  return await api.get(`/shop`);
};

const getShopById = async (id) => {
  return await api.get(`/shop/${id}`);
};

const createShop = async (data) => {
  return await api.post(`/shop`, data);
};

const deleteShop = async (id) => {
  return await api.delete(`/shop/${id}`);
};

export { getShops, getShopById, createShop, deleteShop };
