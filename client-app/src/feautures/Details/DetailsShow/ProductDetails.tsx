import { observer } from "mobx-react-lite";
import React, {  useContext, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ProductStore from "../../../app/stores/productStore";
interface DetailParams{
  id:string
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
  const productStore = useContext(ProductStore);
  const { product, loadProduct, loadingInitial,submitting} = productStore;

  useEffect(() => {
    loadProduct(match.params.id);
  },[loadProduct,match.params.id]);

  if(loadingInitial||!product)return <LoadingComponent content="Loading Product..." />
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{product.productName}</Card.Header>
        <Card.Meta>
          <span>{product.modelYear}</span>
        </Card.Meta>
        <Card.Description>{product.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            loading={submitting}
            as={Link} to={`/manage/${product.productId}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={()=> history.push("/dashboard/productmaster/product")}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ProductDetails);
