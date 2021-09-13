import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IProduct } from '../../../../app/models/product';
import ProductForm from '../../../Crud-Forma/productForm';
import ProductDetails from '../../DetailsShow/ProductDetails';
import ProductList from './ProductList';



interface IProps {
  products:IProduct[];
  selectProduct: (productId: string) => void;
  selectedProduct: IProduct | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedProduct: (product: IProduct | null) => void;
  createProduct: (product: IProduct) => void;
  editProduct: (product: IProduct) => void;
  deleteProduct: (productId: string) => void;
  openCreateForm: () => void;

}

const ProductDashboard: React.FC<IProps> = ({
  products,
  selectProduct,
  selectedProduct,

  editMode,
  setEditMode,
  setSelectedProduct,
  createProduct,
  editProduct,
  deleteProduct,
  openCreateForm
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ProductList
          openCreateForm={openCreateForm}
          products={products}
          selectProduct={selectProduct}
          deleteProduct={deleteProduct}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedProduct && !editMode && (
          <ProductDetails
            product={selectedProduct}
            setEditMode={setEditMode}
            setSelectedProduct={setSelectedProduct}
          />
        )}
        {editMode && (
          <ProductForm
            key={(selectedProduct && selectedProduct.productId) || 0}
            setEditMode={setEditMode}
            product={selectedProduct!}
            createProduct={createProduct}
            editProduct={editProduct}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ProductDashboard;
