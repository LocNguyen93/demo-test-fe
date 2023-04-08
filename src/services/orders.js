import api from "../api";

const getOrders = async () => {
  return await api.get(`/order`);
};

const createOrder = async (data) => {
  return await api.post(`/order`, data);
};

export { getOrders, createOrder };
