import React from 'react';
import {Button,  Input, Menu} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../styles.css';

const Dash = () => { 
    return (
      <div>
        <div>
          <Menu stackable>
            <a href="/">
              <img className="icona" src="/assets/logo.png" alt="Logo"></img>
            </a>
            <Menu.Item>
              <Input className="icon" icon="search" placeholder="Search..." />
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

        <Menu vertical inverted>
          <Menu.Item>
            <h3>Product Master</h3>
          </Menu.Item>
          <Menu.Item
            className="itemAdmins"
            name="Product"
            as={Link}
            to="/dashboard/productmaster/product"
          />
          <Menu.Item
            className="itemAdmins"
            name="Sectors"
            as={Link}
            to="/dashboard/productmaster/sectors"
          />
          <Menu.Item
            className="itemAdmins"
            name="Brands"
            as={Link}
            to="/dashboard/productmaster/brands"
          />
          <Menu.Item>
            <h3>Users</h3>
          </Menu.Item>
          <Menu.Item className="itemAdmins" name="Admins" />
          <Menu.Item className="itemAdmins" name="Clients" />

          
        </Menu>

      </div>
    );
  }
 

export default Dash;
