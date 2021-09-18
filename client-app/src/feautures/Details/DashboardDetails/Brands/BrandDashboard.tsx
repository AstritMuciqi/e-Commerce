import { observer } from 'mobx-react-lite';
import React, {  useContext } from 'react';
import { Container } from 'semantic-ui-react';
import BrandForm from '../../../Crud-Forma/brandForm';
import BrandDetails from '../../DetailsShow/BrandDetails';
import BrandList from './BrandList';
import BrandStore from '../../../../app/stores/brandStore';


const BrandDashboard: React.FC = () => {
  const brandStore = useContext(BrandStore);
  const { editMode, selectedBrand } = brandStore;
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <BrandList />

      {selectedBrand && !editMode && (
        <Container style={{ width: "400px" }}>
          <BrandDetails />
        </Container>
      )}
      {editMode && (
        <Container style={{ width: "400px" }}>
          <BrandForm
            key={(selectedBrand && selectedBrand.brandId) || 0}
            brand={selectedBrand!}
          />
        </Container>
      )}
    </Container>
  );
};

export default observer(BrandDashboard);