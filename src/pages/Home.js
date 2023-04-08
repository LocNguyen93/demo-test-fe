import React, { useEffect, useState } from "react";
import { getCustomers } from "../services/customers";
import { getProductsByShops } from "../services/products";
import { getShops } from "../services/shops";
import { getOrders, createOrder } from "../services/orders";
import Table from "rc-table";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";

function Homes() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [orders, setOrders] = useState([]);

  const [shopSelectedValue, setShopSelectedValue] = useState([]);
  const [productSelectedValue, setProductSelectedValue] = useState([]);
  const [customerSelectedValue, setCustomerSelectedValue] = useState();

  const [orderItem, setOrderItem] = useState({
    customer_id: "",
    product_ids: "",
  });

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ProductName",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "ShopName",
      dataIndex: "shop_name",
      key: "shop_name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
  ];

  async function fetchCustomer() {
    const res = await getCustomers();
    if (res.status === 200) {
      setCustomers(res.data.d);
    }
  }

  async function fetchShop() {
    const res = await getShops();
    if (res.status === 200) {
      setShops(
        res.data.d.map((shop) => {
          return {
            value: shop.shop_id,
            label: shop.name,
          };
        })
      );
    }
  }

  async function fetchOrder() {
    const res = await getOrders();
    console.log(res);
    if (res.status === 200) {
      setOrders(res.data.d);
    }
  }

  useEffect(() => {
    fetchOrder();
    fetchCustomer();
    fetchShop();
  }, []);

  const handleCreate = async () => {
    setOrderItem({
      customer_id: customerSelectedValue,
      product_ids: productSelectedValue.join(","),
    });
    console.log(customerSelectedValue, productSelectedValue.join(","));
    const result = await createOrder(orderItem);
    if (result.data.ok) {
      fetchOrder();
    }
  };

  const customerHandleChange = async (e) => {
    setCustomerSelectedValue(e.target.value);
  };

  const shopHandleChange = async (e) => {
    setShopSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
    const res = await getProductsByShops(shopSelectedValue);
    if (res.status === 200) {
      setProducts(
        res.data.d.map((product) => {
          return {
            value: product.product_id,
            label: product.name,
          };
        })
      );
    }
  };

  const productHandleChange = async (e) => {
    setProductSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  return (
    <div className="container">
      <h5>Order list</h5>

      <div className="p-5">
        <Form>
          <Form.Group className="mb-3" controlId="customer">
            <Form.Label>Customer</Form.Label>
            <Form.Select onChange={(e) => customerHandleChange(e)}>
              <option>Open this select customer</option>
              {customers.map((customer) => (
                <option value={customer.customer_id}>
                  {customer.full_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="shop">
            <Form.Label>Shops</Form.Label>
            <Select
              onChange={shopHandleChange}
              placeholder="Select Option"
              value={shops.filter((obj) =>
                shopSelectedValue.includes(obj.value)
              )} // set selected values
              options={shops} // set list of the data
              isMulti
              isClearable
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="product">
            <Form.Label>Products</Form.Label>
            <Select
              onChange={productHandleChange}
              placeholder="Select Option"
              value={products.filter((obj) =>
                productSelectedValue.includes(obj.value)
              )} // set selected values
              options={products} // set list of the data
              isMulti
              isClearable
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleCreate}>
            Create
          </Button>
        </Form>
      </div>

      {orders.length === 0 ? (
        <div className="text-center">
          <div>No data</div>
        </div>
      ) : (
        <Table columns={columns} rowKey="order_id" data={orders} />
      )}
    </div>
  );
}

export default Homes;
