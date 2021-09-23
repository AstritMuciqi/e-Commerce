import React, { useState, FormEvent, useEffect, useContext } from "react";
import { Segment, Form, Button, Dropdown } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { IProduct } from "../../app/models/product";
import ProductStore from "../../app/stores/productStore";
import SectorStore from "../../app/stores/sectorStore";
import BrandStore from "../../app/stores/brandStore";

import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../app/layout/LoadingComponent";
interface DetailParams {
  id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const productStore = useContext(ProductStore);
  const sectorStore = useContext(SectorStore);
  const brandStore = useContext(BrandStore);
  const { loadBrands, brandsData } = brandStore;

  const { loadSectors, sectorsData } = sectorStore;
  const {
    createProduct,
    editProduct,
    product: initialFormState,
    loadProduct,
    clearProduct,
    submitting,
  } = productStore;
  const [product, setProduct] = useState<IProduct>({
    productId: "",
    productName: "",
    sector: "",
    brand: "",
    valueOfProduct: "",
    modelYear: "",
    quantity: "",
    description: "",
  });
  useEffect(() => {
    if (match.params.id&&product.productId.length === 0) {
      loadProduct(match.params.id).then(
        () => initialFormState && setProduct(initialFormState)
      );
    }
    return () => {
      clearProduct();
    };
  }, [loadProduct, match.params.id, clearProduct, initialFormState,product.productId.length]);



  const handleSubmit = () => {
    if (product.productId.length === 0) {
      let newProduct = {
        ...product,
        productId: uuid(),
      };
      createProduct(newProduct).then(()=>history.push(`/product/edit/${newProduct.productId}`));
    } else {
      editProduct(product).then(()=>history.push(`/product/edit/${product.productId}`));
    }
  };

  useEffect(() => {
    loadSectors();
  }, [loadSectors]);
  useEffect(() => {
    loadBrands();
  }, [loadBrands]);
  if (sectorStore.loadingInitial) return <LoadingComponent content="Loading data" />;


  const handleBrandChange = (ev: React.SyntheticEvent, { value }: any) => {
    setProduct({ ...product, brand: value });
  };
  const handleSectorChange = (ev: React.SyntheticEvent, { value }: any) => {
    setProduct({ ...product, sector: value });
  };
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProduct({ ...product, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="productName"
          placeholder="Product Name"
          value={product.productName}
        />

        <Dropdown
          placeholder="Select Sector"
          onChange={handleSectorChange}
          fluid
          search
          selection
          options={sectorsData.map((sector) => ({
            key: sector.sectorId,
            value: sector.sectorName,
            text: sector.sectorName,
          }))}
          value={product.sector}
        />

        <Dropdown
          placeholder="Select Brand"
          onChange={handleBrandChange}
          fluid
          search
          selection
          options={brandsData.map((brand) => ({
            key: brand.brandId,
            value: brand.brandName,
            text: brand.brandName,
          }))}
          value={product.brand}
        />
        <Form.Input
          onChange={handleInputChange}
          name="valueOfProduct"
          type="numeber"
          step="0.01"
          placeholder="ValueOfProduct"
          value={product.valueOfProduct}
        />
        <Form.Input
          onChange={handleInputChange}
          name="modelYear"
          type="date"
          placeholder="Model Year"
          value={product.modelYear}
        />
        <Form.Input
          onChange={handleInputChange}
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={product.quantity}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={product.description}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push("/dashboard/productmaster/product")}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ProductForm);
