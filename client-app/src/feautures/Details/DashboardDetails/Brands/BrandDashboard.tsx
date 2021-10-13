import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import BrandList from "./BrandList";
import BrandStore from "../../../../app/stores/brandStore";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { RootStore, RootStoreContext } from "../../../../app/stores/rootStore";

const BrandDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadBrands, loadingInitial} = rootStore.brandStore;

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);
  if (loadingInitial)
    return <LoadingComponent content="Loading Brands..." />;
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <BrandList />
    </Container>
  );
};

export default observer(BrandDashboard);
