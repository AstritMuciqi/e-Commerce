import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Icon, Input, Menu } from "semantic-ui-react";
import Kategorite from "./Kategorite";

const Navbar: React.FC = () => {
  return (
    <Fragment>
      <Menu
        fixed="top"
        style={{
          backgroundColor: "black",
          boxShadow: "0 3px 5px -2px rgb(365 365 365 / 18%)",
        }}
      >
        <a href="/">
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{ width: "150px", height: "120px", marginTop: "2px" }}
          />
        </a>

        <Menu.Item position="right" style={{ marginRight: "40px" }}>
          <Input
            inverted
            size="big"
            icon="search"
            placeholder="Search..."
            style={{ marginRight: "100px", width: "130vh" }}
          />
          <Icon
            as={Link}
            to="/dashboard/home"
            style={{ marginRight: "20px", textDecoration: "none" }}
          >
            <Icon inverted name="dashboard" size="big" />
          </Icon>
          <Icon
            inverted
            name="shopping cart"
            size="big"
            style={{ marginRight: "27px" }}
          />

          <Icon
            inverted
            name="user"
            size="big"
            style={{ marginRight: "20px" }}
          />
        </Menu.Item>
      </Menu>
      <Kategorite />
    </Fragment>
  );
};

export default Navbar;
