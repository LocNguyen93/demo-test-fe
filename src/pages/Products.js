import React, { useEffect, useState } from "react";
import { getProducts, createProduct } from "../services/products";
import Table from "rc-table";
import { Button, Form } from "react-bootstrap";

function Products() {
  const [products, setProducts] = useState([]);
  const [productItem, setProductItem] = useState({ name: "", price: 0 });

  const columns = [
    {
      title: "ID",
      dataIndex: "product_id",
      key: "product_id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  async function fetchProduct() {
    const res = await getProducts();
    if (res.status === 200) {
      setProducts(res.data.d);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleCreate = async () => {
    // call api create
    const result = await createProduct(productItem);
    if (result.data.ok) {
      setProductItem({ name: "", price: 0 });
      fetchProduct();
    }
  };

  const handleChange = (event, name) => {
    event.preventDefault();
    const value = event.currentTarget.value;

    setProductItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h5>Product list</h5>

      <div className="p-5">
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={productItem.name}
              onChange={(e) => handleChange(e, "name")}
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={productItem.price}
              onChange={(e) => handleChange(e, "price")}
              placeholder="Price"
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleCreate}>
            Create
          </Button>
        </Form>
      </div>

      {products.length < 30 ? (
        <div className="text-center">
          <div>Not enough data</div>
        </div>
      ) : (
        <Table columns={columns} rowKey="product_id" data={products} />
      )}
    </div>
  );
}

export default Products;
