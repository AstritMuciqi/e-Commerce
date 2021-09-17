import React, { SyntheticEvent } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { IProduct } from '../../../../app/models/product';
import ProductForm from '../../../Crud-Forma/productForm';
import ProductDetails from '../../DetailsShow/ProductDetails';
import ProductList from './ProductList';



interface IProps {
  products: IProduct[];
  selectProduct: (productId: string) => void;
  selectedProduct: IProduct | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedProduct: (product: IProduct | null) => void;
  createProduct: (product: IProduct) => void;
  editProduct: (product: IProduct) => void;
  deleteProduct: (
    e: SyntheticEvent<HTMLButtonElement>,
    productId: string
  ) => void;
  openCreateForm: () => void;
  submitting: boolean;
  target: string;
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
  openCreateForm,
  submitting,
  target
}) => {
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <ProductList
        openCreateForm={openCreateForm}
        products={products}
        selectProduct={selectProduct}
        deleteProduct={deleteProduct}
        submitting={submitting}
        target={target}
      />
      {selectedProduct && !editMode && (
        <Container style={{ width: "400px" }}>
          <ProductDetails
            product={selectedProduct}
            setEditMode={setEditMode}
            setSelectedProduct={setSelectedProduct}
          />
        </Container>
      )}

      {editMode && (
        <Container style={{ width: "400px" }}>
          <ProductForm
            key={(selectedProduct && selectedProduct.productId) || 0}
            setEditMode={setEditMode}
            product={selectedProduct!}
            createProduct={createProduct}
            editProduct={editProduct}
            submitting={submitting}
          />
        </Container>
      )}
    </Container>
  );
};

export default ProductDashboard;
