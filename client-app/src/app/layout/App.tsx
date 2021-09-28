import React, { useContext } from "react";
import { Container } from "semantic-ui-react";
import Faturimi from "./FaturimiLayout/Faturimi";
import { Route, Switch } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router-dom";

import ProductDashboard from "../../feautures/Details/DashboardDetails/Product/ProductDashboard";
import SectorDashboard from "../../feautures/Details/DashboardDetails/Sector/SectorDashboard";
import BrandDashboard from "../../feautures/Details/DashboardDetails/Brands/BrandDashboard";
import Dash from "./DashboardLayout/SideBarDashboard/dash";
import "./styles.css";
import { observer } from "mobx-react-lite";
import Home from "./HomePageLayout/Home";
import productForm from "../../feautures/Crud-Forma/productForm";
import sectorForma from "../../feautures/Crud-Forma/sectorForma";
import brandForm from "../../feautures/Crud-Forma/brandForm";
import ProductDetails from "../../feautures/Details/DetailsShow/ProductDetails";
import SectorDetails from "../../feautures/Details/DetailsShow/SectorDetails";
import BrandDetails from "../../feautures/Details/DetailsShow/BrandDetails";
import ProductStore from "../stores/productStore";
import SectorStore from "../stores/sectorStore";
import LoadingComponent from "./LoadingComponent";
import BrandStore from "../stores/brandStore";
import DashboardContent from "./DashboardLayout/DashboardContent";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const sectorStore = useContext(SectorStore);
  const productStore = useContext(ProductStore);
  const brandStore = useContext(BrandStore);
  if (
    sectorStore.loadingInitial &&
    brandStore.loadingInitial &&
    productStore.loadingInitial
  )
    return <LoadingComponent content="Loading..." />;

  return (
    <Container className="APP-Page">
      <Switch>
        <Route path="/product/edit/:id" component={ProductDetails} />
        <Route path="/sector/edit/:id" component={SectorDetails} />
        <Route
          key={location.key}
          path={["/createProduct", "/manage/product/:id"]}
          component={productForm}
        />
        <Route
          key={location.key}
          path={["/createSector", "/manage/sector/:id"]}
          component={sectorForma}
        />

        <Route
          key={location.key}
          path={["/createBrand", "/manage/brand/:id"]}
          component={brandForm}
        />
        <Route path="/brand/edit/:id" component={BrandDetails} />
        <Route path="/dashboard/productmaster/product">
        <ProductDashboard />
      </Route>
      <Route path="/dashboard/productmaster/sectors">
        <SectorDashboard />
      </Route>
      <Route path="/dashboard/productmaster/brands">
        <BrandDashboard />
      </Route>
      <Route path="/dashboard/home">
        <DashboardContent />
      </Route>
      <Route path="/" component={Home} exact />
      </Switch>
      <Route path="/faturimi" component={Faturimi} />
      <Route path="/dashboard" component={Dash}  />
    </Container>
  );
};

export default withRouter(observer(App));
