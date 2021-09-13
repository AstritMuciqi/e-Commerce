import React from "react";
import { IProduct } from "../../../../app/models/product";
import {
  Wrapper,
  Card,
  CardImage,
  CardBody,
  CardTitle,
  CardPrice,
} from "./Styles";
  
interface IProps {
  products:IProduct[];
}

  const HomeItems: React.FC<IProps> = ({
    products,
   
  }) => {
    return (
      <div>
      <Wrapper>
     {products.map((product) => (
       <Card key={product.productId}>
       <CardImage src="./assets/product1.jpg" />
       <CardBody>
         <CardTitle>{product.productName}</CardTitle>
         <CardPrice>{product.valueOfProduct}</CardPrice>
       </CardBody>
     </Card>
     ))}
   </Wrapper>

   </div>
        
    );
  };
  
  export default HomeItems;
  
  