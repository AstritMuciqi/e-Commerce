import React from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Input, Menu } from "semantic-ui-react";
import '../../app/layout/styles.css';
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
        <Header as="h3" block>
          <Menu>
            <a href="/">
              <img className="icona" src="/assets/logo.png" alt="Logo" ></img> 
            </a>
            <Input
              icon={<Icon name="search" inverted circular link />}
              placeholder="Kërko..."
            />
            <Icon as={Link} to="/dashboard" ><Icon name="dashboard" size="big"/></Icon>

            <Icon name="user" size="big" />

            <Icon name="shopping cart" size="big" />

            {/* <Kategorite sectors={sectors} /> */}
          </Menu>
          <Kategorite sectors={sectors} />
        </Header>
    );
  };
  
  export default Navbar;
  