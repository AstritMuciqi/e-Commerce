import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {  Button, Icon, Item } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Footer from "../../footer/Footer";
import Navbar from "../../nav/NavBar";
interface DetailParams {
  id: string;
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { product, loadProduct, loadingInitial } = rootStore.productStore;

  useEffect(() => {
    loadProduct(match.params.id);
  }, [loadProduct, match.params.id, history]);

  if (loadingInitial || !product)
    return <LoadingComponent content="Loading Product..." />;
  return (
    <Fragment>
      <div style={{ height: "100%" }}>
        <Navbar />
        <Item.Group fluid style={{ backgroundColor:"white" }}>
        
          <Item>
            <Item.Image style={{borderRight:"5px solid black"}} size="big" src={`/assets/${product.sector}.jpg`} />

            <Item.Content>
              <Item.Header as="a" style={{marginTop:"50px",fontSize:"30px"}}>{product.brand} {product.productName}</Item.Header>
              <Item.Meta style = {{marginTop:"20px"}}>Çmimi i produktit:
              <p style={{color:"green",fontSize:"20px",marginTop:"10px"}}> {product.valueOfProduct}$</p>
              </Item.Meta>
              <Item.Meta>Viti i prodhimit:
              <p style={{fontSize:"20px",color:"black",marginTop:"10px"}}>{product.modelYear}</p>
              </Item.Meta>
              <Item.Meta >
                Brendi:
                <p style={{fontSize:"20px",marginTop:"10px",color:"black"}}>
                  {product.brand}
                </p>
              </Item.Meta>
              <Item.Meta >
                Sektori:
                <p style={{fontSize:"20px",marginTop:"10px",color:"black"}}>
                  {product.sector}
                </p>
              </Item.Meta>
              <Item.Meta >
                Pershkrimi i produktit:
                <p style={{fontSize:"20px",marginTop:"10px",color:"black"}}>
                  {product.description}
                </p>
              </Item.Meta>
              <Item.Meta >
                Disponushmeria:
                <p style={{fontSize:"20px",marginTop:"10px",color:"black"}}>
                  {product.quantity} artikuj
                </p>
              </Item.Meta>
              <Item.Extra extra style={{marginTop:"40px"}}>
             <Button positive>
              Add to Cart{" "}
              <Icon
                style={{ marginLeft: "7px", marginBottom: "3px" }}
                inverted
                name="cart"
                size="large"
              />
            </Button>
          </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>

        <Footer />
      </div>
    </Fragment>
  );
};

export default observer(ProductDetails);
