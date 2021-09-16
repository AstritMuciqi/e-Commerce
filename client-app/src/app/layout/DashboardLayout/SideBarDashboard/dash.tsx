import React from 'react';
import {Button,  Input, Menu} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Dash = () => { 
    return (
      <div>
        <div>
          <Menu fixed="top" inverted>
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
              <Button primary negative>
                Log out
              </Button>
            </Menu.Item>
          </Menu>
        </div>

        <Menu fixed="top" style={{ marginTop: "123px" }} vertical inverted>
          <Menu.Item>
            <h3>Product Master</h3>
          </Menu.Item>
          <Menu.Item
            style={{ marginLeft: "13px" }}
            name="Product"
            as={Link}
            to="/dashboard/productmaster/product"
          />
          <Menu.Item
            style={{ marginLeft: "13px" }}
            name="Sectors"
            as={Link}
            to="/dashboard/productmaster/sectors"
          />
          <Menu.Item
            style={{ marginLeft: "13px" }}
            name="Brands"
            as={Link}
            to="/dashboard/productmaster/brands"
          />
          <Menu.Item>
            <h3>Users</h3>
          </Menu.Item>
          <Menu.Item
            style={{ marginLeft: "13px" }}
            name="Admins"
          />
          <Menu.Item
            style={{ marginLeft: "13px" }}
            name="Clients"
          />
        </Menu>
      </div>
    );
  }
 

export default Dash;
