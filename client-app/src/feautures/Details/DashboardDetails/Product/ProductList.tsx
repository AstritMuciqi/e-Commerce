import React, { Fragment } from 'react';
import {  Button,Container, Icon,  Table } from 'semantic-ui-react';
import { IProduct } from '../../../../app/models/product';
import '../../../../app/layout/DashboardLayout/styles.css';
interface IProps {
  products: IProduct[];
   selectProduct: (productId: string) => void;
   deleteProduct: (productId: string) => void;
   openCreateForm: () => void;
}


const ProductList: React.FC<IProps> = ({
  products,
  selectProduct,
  deleteProduct,
  openCreateForm

}) => {
  return (
      <Fragment>
      <Container>
        <Table celled inverted selectable >
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>Product Name</Table.HeaderCell>
              <Table.HeaderCell>Sector</Table.HeaderCell>
              <Table.HeaderCell>Brand</Table.HeaderCell>
              <Table.HeaderCell>Value of Product</Table.HeaderCell>
              <Table.HeaderCell>Model Year</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell colSpan={"8"}>Description</Table.HeaderCell>
              <Table.HeaderCell>Options</Table.HeaderCell>
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
                      onClick={() => deleteProduct(product.productId)}
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
            <Table.Row>
              <Table.HeaderCell colSpan="15">
                <Button
                  onClick={openCreateForm}
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
      </Container>
    </Fragment>

    
  );
};

export default ProductList;
