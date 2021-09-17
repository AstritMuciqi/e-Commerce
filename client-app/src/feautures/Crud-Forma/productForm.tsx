import React, { useState, FormEvent, useEffect } from 'react';
import { Segment, Form, Button, Dropdown } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import { IProduct } from '../../app/models/product';
import { ISector } from '../../app/models/sector';
import agent from '../../app/API/agent';
import { IBrand } from '../../app/models/brand';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  product: IProduct;
  createProduct: (product: IProduct) => void;
  editProduct: (product: IProduct) => void;
  submitting:boolean;
}

const ProductForm: React.FC<IProps> = ({
  setEditMode,
  product: initialFormState,
  editProduct,
  createProduct,
  submitting
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        productId: '',
        productName: '',
        sector: '',
        brand: '',
        valueOfProduct: '',
        modelYear: '',
        quantity: '',
        description: ''
        
      };
    }
  };

  const [product, setProduct] = useState<IProduct>(initializeForm);


  const handleSubmit = () => {
    if (product.productId.length === 0) {
      let newProduct = {
        ...product,
        productId: uuid()
      };
      createProduct(newProduct);
    } else {
      editProduct(product);
    }
  };

  const [sectors, setSectors] = useState<ISector[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);


  useEffect(() => {
    agent.Sectors.sectorList()
      .then((response) => {
        let sectors: ISector[] = [];
        response.forEach((sector) => {
          sector.sectorName = sector.sectorName.split(".")[0];
          sectors.push(sector);
        });
        setSectors(sectors);
      });
  }, []);
  useEffect(() => {
    agent.Brands.brandList()
      .then((response) => {
        let brands: IBrand[] = [];
        response.forEach((brand) => {
          brand.brandName = brand.brandName.split(".")[0];
          brands.push(brand);
        });
        setBrands(brands);
      });
  }, []);
  const handleBrandChange=(
    ev: React.SyntheticEvent, {value}:any
    )=>{
      setProduct({...product,brand: value})
    };
  const handleSectorChange =(
    ev: React.SyntheticEvent, {value}:any
    )=>{
      setProduct({...product,sector: value})
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
          options={sectors.map((sector) => ({
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
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ProductForm;
