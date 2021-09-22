import React, { useState, FormEvent, useEffect, useContext } from "react";
import { Segment, Form, Button, Dropdown } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { IProduct } from "../../app/models/product";
import agent from "../../app/API/agent";
import { IBrand } from "../../app/models/brand";
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

  const { loadSectors, sectorsData } = sectorStore;
  const {
    createProduct,
    editProduct,
    product: initialFormState,
    loadProduct,
    clearProduct,
  } = productStore;

  useEffect(() => {
    if (match.params.id) {
      loadProduct(match.params.id).then(
        () => initialFormState && setProduct(initialFormState)
      );
    }
    return () => {
      clearProduct();
    };
  }, [loadProduct, match.params.id, clearProduct, initialFormState]);

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

  const handleSubmit = () => {
    if (product.productId.length === 0) {
      let newProduct = {
        ...product,
        productId: uuid(),
      };
      createProduct(newProduct);
    } else {
      editProduct(product);
    }
  };
  const [brands, setBrands] = useState<IBrand[]>([]);

  useEffect(() => {
    loadSectors();
  }, [loadSectors]);
  useEffect(() => {
    agent.Brands.brandList().then((response) => {
      let brands: IBrand[] = [];
      response.forEach((brand) => {
        brand.brandName = brand.brandName.split(".")[0];
        brands.push(brand);
      });
      setBrands(brands);
    });
  }, []);

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
  if (
    productStore.loadingInitial &&
    sectorStore.loadingInitial &&
    brandStore.loadingInitial
  )
    return <LoadingComponent content="Loading data" />;
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
          options={brands.map((brand) => ({
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
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => history.push(`/product/edit/${product.productId}`)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ProductForm);
