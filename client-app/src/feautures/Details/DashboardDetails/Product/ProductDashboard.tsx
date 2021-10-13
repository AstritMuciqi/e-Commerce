import React, { useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import ProductList from "./ProductList";
import { observer } from "mobx-react-lite";
import ProductStore from '../../../../app/stores/productStore'
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../../app/stores/rootStore";
const ProductDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadProducts, loadingInitial} = rootStore.productStore;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loadingInitial)
    return <LoadingComponent content='Loading Products...' />;
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <ProductList />
    </Container>
  );
};

export default observer(ProductDashboard);
