import React, { useEffect, useContext } from "react";
import { Container } from "semantic-ui-react";
import Faturimi from "./FaturimiLayout/Faturimi";
import { Route } from "react-router";
import ProductDashboard from "../../feautures/Details/DashboardDetails/Product/ProductDashboard";
import SectorDashboard from "../../feautures/Details/DashboardDetails/Sector/SectorDashboard";

import BrandDashboard from "../../feautures/Details/DashboardDetails/Brands/BrandDashboard";
import { Home } from "./HomePageLayout/Home";
import Dash from "./DashboardLayout/SideBarDashboard/dash";
import "./styles.css";
import LoadingComponent from "./LoadingComponent";
import SectorStore from "../stores/sectorStore";
import BrandStore from "../stores/brandStore";
import ProductStore from "../stores/productStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const productStore = useContext(ProductStore);
  const sectorStore = useContext(SectorStore);
  const brandStore = useContext(BrandStore);

  useEffect(() => {
    productStore.loadProducts();
  }, [productStore]);
  useEffect(() => {
    sectorStore.loadSectors();
  }, [sectorStore]);
  useEffect(() => {
    brandStore.loadBrands();
  }, [brandStore]);
  if (
    productStore.loadingInitial &&
    sectorStore.loadingInitial &&
    brandStore.loadingInitial
  )
    return <LoadingComponent content="Please Wait!" />;

  return (
    <Container className="APP-Page">
      <Route path="/faturimi" component={Faturimi} />

      <Route path="/dashboard" component={Dash} />
      <Route path="/" component={Home} exact />

      <Route path="/dashboard/productmaster/product">
        <ProductDashboard />
      </Route>
      <Route path="/dashboard/productmaster/sectors">
        <SectorDashboard />
      </Route>
      <Route path="/dashboard/productmaster/brands">
        <BrandDashboard />
      </Route>
    </Container>
  );
};

export default observer(App);
