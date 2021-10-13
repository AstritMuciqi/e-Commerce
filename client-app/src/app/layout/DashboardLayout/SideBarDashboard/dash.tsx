import React, { Fragment, useContext } from "react";
import { Button,  Icon, Input, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../stores/rootStore";

const Dash = () => {
  const rootStore = useContext(RootStoreContext);
  const {logout} = rootStore.userStore;
  return (
    <Fragment>
      <Menu fixed="top" style={{ backgroundColor: "black" }}>
        <a href="/">
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{ width: "150px", height: "120px", marginTop: "2px" }}
          />
        </a>
        <Menu.Item style={{ width: "500px", marginLeft: "40px" }}>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item position="right">
          <Input
            action={{ type: "submit", content: "Go" }}
            placeholder="Navigate to..."
          />
        </Menu.Item>
        <Menu.Item>
          <Button onClick={logout} primary negative>
            Log out
          </Button>
        </Menu.Item>
      </Menu>

      <Menu
        style={{ marginTop: "123px", height: "1000px" }}
        inverted
        vertical
        fixed="top"
      >
        <Menu.Item as={Link} to="/dashboard/contactUsClients/">
          <h3 style={{ color: "#F5BD3D" }}>
            <Icon name="home" size="big" />
            Client Problems
          </h3>
        </Menu.Item>
        <Menu.Item>
          <h3 style={{ color: "#F5BD3D" }}>
            <Icon name="product hunt" size="big" />
            Product Master
          </h3>
        </Menu.Item>
        <Menu.Item
          style={{ marginLeft: "17px", color: "#F5BD3D" }}
          icon="caret right"
          name="Product"
          as={Link}
          to="/dashboard/productmaster/product"
        />
        <Menu.Item
          style={{ marginLeft: "17px", color: "#F5BD3D" }}
          icon="caret right"
          name="Sectors"
          as={Link}
          to="/dashboard/productmaster/sectors"
        />
        <Menu.Item
          style={{ marginLeft: "17px", color: "#F5BD3D" }}
          icon="caret right"
          name="Brands"
          as={Link}
          to="/dashboard/productmaster/brands"
        />
        <Menu.Item>
          <h3 style={{ color: "#F5BD3D" }}>
            <Icon
              style={{ width: "50px", height: "10px", marginBottom: "40px" }}
              name="users"
              size="big"
            />
            Users
          </h3>
        </Menu.Item>
        <Menu.Item
          style={{ marginLeft: "17px", color: "#F5BD3D" }}
          icon="caret right"
          name="Admins"
        />
        <Menu.Item
          style={{ marginLeft: "17px", color: "#F5BD3D" }}
          icon="caret right"
          name="Clients"
        />
      </Menu>
    </Fragment>
  );
};

export default Dash;
