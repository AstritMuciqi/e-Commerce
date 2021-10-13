import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import ProductStore from "../../../../app/stores/productStore";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const HomeItems: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadProducts, loadingInitial} = rootStore.productStore;
  const { productsData } = rootStore.productStore;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loadingInitial)
    return <LoadingComponent content="Loading..." />;

  return (
    <Card.Group doubling itemsPerRow={4} stackable>
      {productsData.map((product) => (
        <Card
          as={Link}
          to={`/product/edit/${product.productId}`}
          style={{
            marginLeft: "5vh",
            marginTop: "18px",
            width: "275px",
            height: "400px",
          }}
          key={product.productId}
        >
          <Image
            style={{ width: "275px", height: "220px" }}
            src={`assets/${product.sector}.jpg`}
          />
          <Card.Content>
            <Card.Description style={{ fontSize: "16px" }}>
              {product.productName} {product.brand}, {product.description}
            </Card.Description>
            <Card.Header style={{ marginTop: "10px" }}>
              {product.valueOfProduct}$
            </Card.Header>
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
      ))}
    </Card.Group>
  );
};

export default observer(HomeItems);
