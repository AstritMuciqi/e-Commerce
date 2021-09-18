import React, { useContext } from 'react';
import {  Button, Icon,  Table } from 'semantic-ui-react';
import { observer } from "mobx-react-lite";
import ProductStore from '../../../../app/stores/productStore'

const ProductList: React.FC = () => {
  const productStore = useContext(ProductStore);
  const {products,selectProduct ,deleteProduct,submitting,target} = productStore;
  return (
    <Table
      className="produktet"
      style={{ marginLeft: "104px" }}
      celled
      inverted
      selectable
    >
      <Table.Header fullWidth>
        <Table.Row style={{ backgroundColor: "#F5BD3D" }}>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>Product Name</b>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>Sector</b>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>Brand</b>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>Value of Product</b>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>Model Year</b>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>Quantity</b>
          </Table.HeaderCell>
          <Table.HeaderCell colSpan={"8"}>
            <b style={{ color: "black" }}>Description</b>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>Options</b>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {products.map((product) => (
          <Table.Row positive key={product.productId}>
            <Table.Cell>{product.productName}</Table.Cell>
            <Table.Cell>{product.sector}</Table.Cell>
            <Table.Cell>{product.brand}</Table.Cell>
            <Table.Cell>{product.valueOfProduct}</Table.Cell>
            <Table.Cell>{product.modelYear}</Table.Cell>
            <Table.Cell>{product.quantity}</Table.Cell>
            <Table.Cell colSpan="8">{product.description}</Table.Cell>
            <Table.Cell colSpan="2">
              <Button.Group>
                <Button
                  onClick={() => selectProduct(product.productId)}
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
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row style={{ backgroundColor: "#F5BD3D" }}>
          <Table.HeaderCell colSpan="15">
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                width: "157px",
              }}
              onClick={productStore.openCreateForm}
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
      </Table.Footer>
    </Table>
  );
};

export default observer(ProductList);
