import React, { SyntheticEvent } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { IBrand } from '../../../../app/models/brand';
import BrandForm from '../../../Crud-Forma/brandForm';
import BrandDetails from '../../DetailsShow/BrandDetails';
import BrandList from './BrandList';





interface IProps {
  brands: IBrand[];
  selectBrand: (brandId: string) => void;
  selectedBrand: IBrand | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedBrand: (brand: IBrand | null) => void;
  createBrand: (brand: IBrand) => void;
  editBrand: (brand: IBrand) => void;
  deleteBrand: (e:SyntheticEvent<HTMLButtonElement>, brandId: string) => void;
  openCreateForm: () => void;
  submitting: boolean;
  target: string;
}

const BrandDashboard: React.FC<IProps> = ({
  brands,
  selectBrand,
  selectedBrand,
  editMode,
  setEditMode,
  setSelectedBrand,
  createBrand,
  editBrand,
  deleteBrand,
  openCreateForm,
  submitting,
  target,
}) => {
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <BrandList
        openCreateForm={openCreateForm}
        brands={brands}
        selectBrand={selectBrand}
        deleteBrand={deleteBrand}
        submitting={submitting}
        target={target}
      />

      {selectedBrand && !editMode && (
        <Container style={{ width: "400px" }}>
          <BrandDetails
            brand={selectedBrand}
            setEditMode={setEditMode}
            setSelectedBrand={setSelectedBrand}
          />
        </Container>
      )}
      {editMode && (
        <Container style={{ width: "400px" }}>
          <BrandForm
            key={(selectedBrand && selectedBrand.brandId) || 0}
            setEditMode={setEditMode}
            brand={selectedBrand!}
            createBrand={createBrand}
            editBrand={editBrand}
            submitting={submitting}
          />
        </Container>
      )}
    </Container>
  );
};

export default BrandDashboard;