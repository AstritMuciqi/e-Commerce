import React, { useContext } from 'react';
import { Container } from "semantic-ui-react";
import ProductForm from '../../../Crud-Forma/productForm';
import ProductDetails from '../../DetailsShow/ProductDetails';
import ProductList from './ProductList';
import { observer } from "mobx-react-lite";
import ProductStore from '../../../../app/stores/productStore';
const ProductDashboard: React.FC = () => {
  const productStore = useContext(ProductStore);
  const  {editMode,selectedProduct} = productStore;
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <ProductList />
      {selectedProduct && !editMode && (
        <Container style={{ width: "400px" }}>
          <ProductDetails />
        </Container>
      )}

      {editMode && (
        <Container style={{ width: "400px" }}>
          <ProductForm
            key={(selectedProduct && selectedProduct.productId) || 0}
            product={selectedProduct!}
          />
        </Container>
      )}
    </Container>
  );
};

export default observer(ProductDashboard);
