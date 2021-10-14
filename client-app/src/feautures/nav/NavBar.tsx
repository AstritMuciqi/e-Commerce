import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Icon, Image, Input, Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import Kategorite from "./Kategorite";

const Navbar = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user, logout } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
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

        <Menu.Item position="right" style={{ marginRight: "50px" }}>
          <Input
            inverted
            size="big"
            icon="search"
            placeholder="Search..."
            style={{ marginRight: "80px", width: "120vh" }}
          />
          <Icon
            as={Link}
            to="dashboard/clientProblems"
            style={{ marginRight: "30px", textDecoration: "none" }}
          >
            <Icon inverted name="dashboard" size="big" />
          </Icon>
          <Icon
            inverted
            name="shopping cart"
            size="big"
            style={{ marginRight: "27px" }}
          />
          {!user && (
            <Icon
              onClick={() => openModal(<LoginForm />)}
              inverted
              name="user"
              size="big"
              style={{ marginRight: "20px" }}
            />
          )}
          {user && (
            <Fragment>
              <Icon inverted size="big" name="user circle" />
              <Dropdown
                style={{ color: "white" }}
                pointing="top left"
                text={user.displayName}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/profile/username`}
                    text="My profile"
                    icon="user"
                  />
                  <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                </Dropdown.Menu>
              </Dropdown>
            </Fragment>
          )}
        </Menu.Item>
      </Menu>
      <Kategorite />
    </Fragment>
  );
};

export default Navbar;
