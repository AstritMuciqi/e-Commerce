import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Icon, Input,Menu} from "semantic-ui-react";
import { ISector } from "../../app/models/sector";
import Kategorite from "./Kategorite";
interface IProps {
  sectors:ISector[];
  // selectActivity: (id: string) => void;
  // selectedActivity: IActivity | null;
  // editMode: boolean;
  // setEditMode: (editMode: boolean) => void;
  // setSelectedActivity: (activity: IActivity | null) => void;
  // createActivity: (activity: IActivity) => void;
  // editActivity: (activity: IActivity) => void;
  // deleteActivity: (id: string) => void;
}

  const Navbar: React.FC<IProps> = ({
    sectors,
    // selectProduct,
    // selectedProduct,
    // editMode,
    // setEditMode,
    // setSelectedProduct,
    // createProduct,
    // editProduct,
    // deleteProduct,
    // openCreateForm
  }) => {
    return (
      <Fragment>
        <Menu fixed="top" style={{backgroundColor:"black",boxShadow:"0 3px 5px -2px rgb(365 365 365 / 18%)"}}>
          <a href="/" >
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
            <Icon  as={Link} to="/dashboard" style={{ marginRight: "20px",textDecoration:"none" }} >
              <Icon inverted name="dashboard" size="big" />
            </Icon>
            <Icon inverted
              name="shopping cart"
              size="big"
              style={{ marginRight: "27px" }}
            />

            <Icon inverted name="user" size="big" style={{ marginRight: "20px" }} />
          </Menu.Item>
         
        </Menu>
        <Kategorite sectors={sectors} />

      </Fragment>
    );
  };
  
  export default Navbar;
  