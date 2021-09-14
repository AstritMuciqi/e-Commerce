import React, { Fragment } from "react";
import { ISector } from "../../app/models/sector";
import '../../app/layout/styles.css';
import {  Menu} from "semantic-ui-react";
import { Link } from "react-router-dom";


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

  const Kategorite: React.FC<IProps> = ({
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
        <Menu
          fixed="top"
          style={{
            borderTop: "2px solid green",
            marginTop: "127px",
            backgroundColor: "black",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {sectors.map((sector) => (
            <Menu.Item
              key={sector.sectorId}
              style={{
                borderRight: "2px solid green",
                borderLeft: "2px solid green",
                textAlign: "center",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <ul
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight:"bolder",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                <a className="link" >
                {sector.sectorName}
                </a>
              </ul>
            </Menu.Item>
          ))}
        </Menu>
      </Fragment>
    );
  };
  
  export default Kategorite;
  
