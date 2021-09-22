import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import BrandList from "./BrandList";
import BrandStore from "../../../../app/stores/brandStore";
import LoadingComponent from "../../../../app/layout/LoadingComponent";

const BrandDashboard: React.FC = () => {
  const brandStore = useContext(BrandStore);

  useEffect(() => {
    brandStore.loadBrands();
  }, [brandStore]);
  if (brandStore.loadingInitial)
    return <LoadingComponent content="Loading brands..." />;
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <BrandList />
    </Container>
  );
};

export default observer(BrandDashboard);
