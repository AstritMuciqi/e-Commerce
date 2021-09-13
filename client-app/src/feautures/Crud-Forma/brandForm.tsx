import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import '../../app/layout/DashboardLayout/styles.css';
import { IBrand } from '../../app/models/brand';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  brand: IBrand;
  createBrand: (brand: IBrand) => void;
  editBrand: (brand: IBrand) => void;
}

const BrandForm: React.FC<IProps> = ({
  setEditMode,
  brand: initialFormState,
  editBrand,
  createBrand
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        brandId: '',
        brandName: '',  
      };
    }
  };

  const [brand, setBrand] = useState<IBrand>(initializeForm);

  const handleSubmit = () => {
    if (brand.brandId.length === 0) {
      let newBrand = {
        ...brand,
        brandId: uuid()
      };
      createBrand(newBrand);
    } else {
      editBrand(brand);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setBrand({ ...brand, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='brandName'
          placeholder='Brand Name'
          value={brand.brandName}
        />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={() => setEditMode(false)}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default BrandForm;
