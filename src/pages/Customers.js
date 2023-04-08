import React, { useEffect, useState } from "react";
import { getCustomers, createCustomer } from "../services/customers";
import Table from "rc-table";
import { Button, Form } from "react-bootstrap";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [customerItem, setCustomerItem] = useState({
    full_name: "",
    email: "",
    birthday: "",
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "customer_id",
      key: "customer_id",
      width: 100,
    },
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
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
  ];

  async function fetchCustomer() {
    const res = await getCustomers();
    if (res.status === 200) {
      setCustomers(res.data.d);
    }
  }

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleCreate = async () => {
    // call api create
    const result = await createCustomer(customerItem);
    if (result.data.ok) {
      setCustomerItem({ full_name: "", email: "", birthday: "" });
      fetchCustomer();
    }
  };

  const handleChange = (event, name) => {
    event.preventDefault();
    const value = event.currentTarget.value;

    setCustomerItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h5>Customer list</h5>

      <div className="p-5">
        <Form>
          <Form.Group className="mb-3" controlId="full_name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={customerItem.full_name}
              onChange={(e) => handleChange(e, "full_name")}
              placeholder="Full Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={customerItem.email}
              onChange={(e) => handleChange(e, "email")}
              placeholder="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="birthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              placeholder="Birthday"
              value={customerItem.birthday}
              onChange={(e) => handleChange(e, "birthday")}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleCreate}>
            Create
          </Button>
        </Form>
      </div>

      {customers.length < 30 ? (
        <div className="text-center">
          <div>Not enough data</div>
        </div>
      ) : (
        <Table columns={columns} rowKey="customer_id" data={customers} />
      )}
    </div>
  );
}

export default Customers;
