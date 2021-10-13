import React, { useContext } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProductStore from "../../../../app/stores/productStore";
import { Link } from "react-router-dom";

const UserList: React.FC = () => {
  const userStore = useContext(UserStore);
  const {  productsData, submitting, target } = userStore;
  return (
    <Table
      style={{ marginLeft: "104px" }}
      celled
      inverted
      selectable
    >
      <Table.Header fullWidth>
        <Table.Row style={{ backgroundColor: "#F5BD3D" }}>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>First Name</b>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>Email</b>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {productsData.map((product) => (
          <Table.Row positive key={product.productId}>
            <Table.Cell>{product.productName}</Table.Cell>
            <Table.Cell>{product.sector}</Table.Cell>
            {/* <Table.Cell colSpan="2">
              <Button.Group>
                <Button
                  as={Link}
                  to={`/manage/product/${product.productId}`}
                  floated="right"
                  content="Edit"
                />
                <Button.Or />
                <Button
                  nama={product.productId}
                  loading={target === product.productId && submitting}
                  onClick={(e) => deleteProduct(e, product.productId)}
                  floated="right"
                  content="Delete"
                  negative
                />
              </Button.Group>
            </Table.Cell> */}
          </Table.Row>
        ))}
      </Table.Body>

      {/* <Table.Footer fullWidth>
        <Table.Row style={{ backgroundColor: "#F5BD3D" }}>
          <Table.HeaderCell colSpan="15">
            <Button
              as={Link}
              to="/createProduct"
              style={{
                backgroundColor: "black",
                color: "white",
                width: "157px",
              }}
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
            >
              <Icon name="product hunt" /> Add Product
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer> */}
    </Table>
  );
};

export default observer(UserList);
