import { observer } from 'mobx-react-lite';
import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import { IBrand } from '../../app/models/brand';
import BrandStore from '../../app/stores/brandStore';
interface IProps {
  brand: IBrand;
}

const BrandForm: React.FC<IProps> = ({
  brand: initialFormState,

}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        brandId: "",
        brandName: "",
      };
    }
  };

  const [brand, setBrand] = useState<IBrand>(initializeForm);

  const handleSubmit = () => {
    if (brand.brandId.length === 0) {
      let newBrand = {
        ...brand,
        brandId: uuid(),
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
  const brandStore = useContext(BrandStore);
  const { createBrand,editBrand,submitting,cancelFormOpen} = brandStore;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="brandName"
          placeholder="Brand Name"
          value={brand.brandName}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={cancelFormOpen}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(BrandForm);
