import api from "../api";

const getCustomers = async () => {
  return await api.get(`/customer`);
};

const getCustomerById = async (id) => {
  return await api.get(`/customer/${id}`);
};

const createCustomer = async (data) => {
  return await api.post(`/customer`, data);
};

const deleteCustomer = async (id) => {
  return await api.delete(`/customer/${id}`);
};

export { getCustomers, getCustomerById, createCustomer, deleteCustomer };
