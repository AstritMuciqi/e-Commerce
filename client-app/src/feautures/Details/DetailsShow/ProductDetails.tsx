import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import {  RouteComponentProps } from "react-router-dom";
import { Card, Button, Image, Icon } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ProductStore from "../../../app/stores/productStore";
import Footer from "../../footer/Footer";
import Navbar from "../../nav/NavBar";
interface DetailParams {
  id: string;
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const productStore = useContext(ProductStore);
  const { product, loadProduct, loadingInitial } = productStore;

  useEffect(() => {
    loadProduct(match.params.id);
  }, [loadProduct, match.params.id,history]);

  if (loadingInitial || !product )
    return <LoadingComponent content="Loading Product..." />;
  return (
    <Fragment>
      <div style={{ height: "100%" }}>
        <Navbar />
        <Card fluid style={{ marginTop: "16em" }}>
          <Image
            style={{ width: "275px", height: "220px" }}
            src={`/assets/${product.sector}.jpg`}
          />
          <Card.Content>
            <Card.Header>{product.productName}</Card.Header>
            <Card.Meta>
              <span>{product.modelYear}</span>
            </Card.Meta>
            <Card.Description>{product.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button positive>
              Add to Cart{" "}
              <Icon
                style={{ marginLeft: "7px", marginBottom: "3px" }}
                inverted
                name="cart"
                size="large"
              />
            </Button>
          </Card.Content>
        </Card>
        <Footer />
      </div>
    </Fragment>
  );
};

export default observer(ProductDetails);
