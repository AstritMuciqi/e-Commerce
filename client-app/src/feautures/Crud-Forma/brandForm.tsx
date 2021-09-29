import { observer } from "mobx-react-lite";
import React, { useState, FormEvent, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { IBrand } from "../../app/models/brand";
import BrandStore from "../../app/stores/brandStore";

interface DetailParams {
  id: string;
}

const BrandForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const brandStore = useContext(BrandStore);
  const {
    createBrand,
    editBrand,
    submitting,
    clearBrand,
    loadBrand,
    loadBrands,
    brand: initialFormState,
  } = brandStore;
  const [brand, setBrand] = useState<IBrand>({
    brandId: "",
    brandName: "",
  });
  useEffect(() => {
    if (match.params.id && brand.brandId.length === 0) {
      loadBrand(match.params.id).then(
        () => initialFormState && setBrand(initialFormState)
      );
    }
    return () => {
      clearBrand();
    };
  }, [
    loadBrand,
    match.params.id,
    clearBrand,
    initialFormState,
    brand.brandId.length,
  ]);

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  const handleSubmit = () => {
    if (brand.brandId.length === 0) {
      let newBrand = {
        ...brand,
        brandId: uuid(),
      };
      createBrand(newBrand).then(() =>
        history.push("/dashboard/productmaster/brands")
      );
    } else {
      editBrand(brand).then(() =>
        history.push("/dashboard/productmaster/brands")
      );
    }
  };
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setBrand({ ...brand, [name]: value });
  };
  if (brandStore.loadingInitial)
    return <LoadingComponent content="Loading data..." />;

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
          onClick={() => history.push("/dashboard/productmaster/brands")}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(BrandForm);
