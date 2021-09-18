import React, { useContext } from 'react';
import { Card, Button } from 'semantic-ui-react';
import BrandStore from '../../../app/stores/brandStore';



const BrandDetails: React.FC = () => {
  const brandStore = useContext(BrandStore);
  const {
    selectedBrand: brand,
    openEditForm,
    cancelSelectedBrand,
  } = brandStore;
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{brand!.brandName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(brand!.brandId)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedBrand}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default BrandDetails;
