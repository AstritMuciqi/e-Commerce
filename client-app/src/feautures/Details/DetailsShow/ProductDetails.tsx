import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';

interface IProps {
    product: IProduct;
    setEditMode: (editMode: boolean) => void;
    setSelectedProduct: (product: IProduct | null) => void;
}

const ProductDetails: React.FC<IProps> = ({product, setEditMode, setSelectedProduct}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{product.productName}</Card.Header>
        <Card.Meta>
          <span>{product.modelYear}</span>
        </Card.Meta>
        <Card.Description>
          {product.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
            <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit' />
            <Button onClick={() => setSelectedProduct(null)} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ProductDetails;
