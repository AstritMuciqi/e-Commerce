import React from "react";
import { Button, Card,Icon,Image } from "semantic-ui-react";
import { IProduct } from "../../../../app/models/product";

  
interface IProps {
  products:IProduct[];
}

  const HomeItems: React.FC<IProps> = ({
    products,
   
  }) => {
    return (
      <Card.Group doubling itemsPerRow={4} stackable>
        {products.map((product) => (
          <Card
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
                {product.brand} {product.productName}, {product.description}
              </Card.Description>
              <Card.Header style={{ marginTop: "10px" }}>
                {product.valueOfProduct}$
              </Card.Header>
            </Card.Content>

            <Card.Content extra>
              <Button positive>
                Add to Cart <Icon style={{marginLeft:"7px",marginBottom:"3px"}} inverted name="cart" size="large" />
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    );
  };
  
  export default HomeItems;
  
  