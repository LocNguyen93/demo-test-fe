import React, { useEffect, useState } from "react";
import { getShops, createShop } from "../services/shops";
import Table from "rc-table";
import { Button, Form } from "react-bootstrap";

function Shops() {
  const [Shops, setShops] = useState([]);
  const [ShopItem, setShopItem] = useState({ name: "", location: "" });

  const columns = [
    {
      title: "ID",
      dataIndex: "shop_id",
      key: "shop_id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
  ];

  async function fetchShop() {
    const res = await getShops();
    if (res.status === 200) {
      setShops(res.data.d);
    }
  }

  useEffect(() => {
    fetchShop();
  }, []);

  const handleCreate = async () => {
    // call api create
    console.log(ShopItem);
    const result = await createShop(ShopItem);
    if (result.data.ok) {
      setShopItem({ name: "", location: "" });
      fetchShop();
    }
  };

  const handleChange = (event, name) => {
    event.preventDefault();
    const value = event.currentTarget.value;

    setShopItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h5>Shop list</h5>

      <div className="p-5">
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={ShopItem.name}
              onChange={(e) => handleChange(e, "name")}
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={ShopItem.location}
              onChange={(e) => handleChange(e, "location")}
              placeholder="location"
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleCreate}>
            Create
          </Button>
        </Form>
      </div>

      {Shops.length < 3 ? (
        <div className="text-center">
          <div>Not enough data</div>
        </div>
      ) : (
        <Table enableRowNumbers
        rowNumberMode="static" columns={columns} rowKey="shop_id" data={Shops} />
      )}
    </div>
  );
}

export default Shops;
