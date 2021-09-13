import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IBrand } from '../../../../app/models/brand';
import BrandForm from '../../../Crud-Forma/brandForm';
import BrandDetails from '../../DetailsShow/BrandDetails';
import BrandList from './BrandList';





interface IProps {
  brands:IBrand[];
  selectBrand: (brandId: string) => void;
  selectedBrand: IBrand | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedBrand: (brand: IBrand | null) => void;
  createBrand: (brand: IBrand) => void;
  editBrand: (brand: IBrand) => void;
  deleteBrand: (brandId: string) => void;
  openCreateForm: () => void;

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
  openCreateForm
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <BrandList
          openCreateForm={openCreateForm}
          brands={brands}
          selectBrand={selectBrand}
          deleteBrand={deleteBrand}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedBrand && !editMode && (
          <BrandDetails
            brand={selectedBrand}
            setEditMode={setEditMode}
            setSelectedBrand={setSelectedBrand}
          />
        )}
        {editMode && (
          <BrandForm
            key={(selectedBrand && selectedBrand.brandId) || 0}
            setEditMode={setEditMode}
            brand={selectedBrand!}
            createBrand={createBrand}
            editBrand={editBrand}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default BrandDashboard;