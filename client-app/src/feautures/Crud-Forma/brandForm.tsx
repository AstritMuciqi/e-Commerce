import { observer } from "mobx-react-lite";
import React, { useState, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import TextInput from "../../app/common/form/TextInput";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { BrandFormValues } from "../../app/models/brand";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../app/stores/rootStore";

const validate = combineValidators({
  brandName: isRequired({ message: "The brand name is required" }),
});
interface DetailParams {
  id: string;
}

const BrandForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial} = rootStore.brandStore;
  const { submitting, loadBrand, loadBrands, createBrand, editBrand } =
    rootStore.brandStore;
  const [brand, setBrand] = useState(new BrandFormValues());
  useEffect(() => {
    if (match.params.id) {
      loadBrand(match.params.id).then((brand) =>
        setBrand(new BrandFormValues(brand))
      );
    }
  }, [loadBrand, match.params.id]);

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...brand } = values;
    if (!brand.brandId) {
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
  if (loadingInitial)
    return <LoadingComponent content="Loading data..." />;

  return (
    <Segment clearing style={{margin:"4em"}}>
      <FinalForm
        validate={validate}
        initialValues={brand}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              component={TextInput}
              name="brandName"
              placeholder="Brand Name"
              value={brand.brandName}
            />
            <Button
              loading={submitting}
              disabled={invalid || pristine}
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
        )}
      />
    </Segment>
  );
};

export default observer(BrandForm);
