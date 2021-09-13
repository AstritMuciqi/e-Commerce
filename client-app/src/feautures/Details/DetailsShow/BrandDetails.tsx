import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { IBrand } from '../../../app/models/brand';

interface IProps {
    brand: IBrand;
    setEditMode: (editMode: boolean) => void;
    setSelectedBrand: (brand: IBrand | null) => void;
}

const BrandDetails: React.FC<IProps> = ({brand, setEditMode, setSelectedBrand}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{brand.brandName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
            <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit' />
            <Button onClick={() => setSelectedBrand(null)} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default BrandDetails;
