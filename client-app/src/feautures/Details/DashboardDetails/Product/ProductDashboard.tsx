import React, { useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import ProductList from "./ProductList";
import { observer } from "mobx-react-lite";
import ProductStore from '../../../../app/stores/productStore'
import LoadingComponent from "../../../../app/layout/LoadingComponent";
const ProductDashboard: React.FC = () => {
  const productStore = useContext(ProductStore);

  useEffect(() => {
    productStore.loadProducts();
  }, [productStore]);

  if (productStore.loadingInitial)
    return <LoadingComponent content='Loading products' />;
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <ProductList />
    </Container>
  );
};

export default observer(ProductDashboard);
