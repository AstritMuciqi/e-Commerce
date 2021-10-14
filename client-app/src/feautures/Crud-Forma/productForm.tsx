import React, { useState, useEffect, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { ProductFormValues } from "../../app/models/product";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import SelectInput from "../../app/common/form/SelectInput";
import NumberInput from "../../app/common/form/NumberInput";
import '../../app/layout/styles.css';
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from "revalidate";
import { RootStoreContext } from "../../app/stores/rootStore";

const validate = combineValidators({
  productName: isRequired({ message: "The product name is required" }),
  sector: isRequired("Sector"),
  brand: isRequired("Brand"),
  valueOfProduct: isRequired("Value of Product"),
  modelYear: isRequired("Model Year"),
  quantity: isRequired("Quantity"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({message: "Description needs to be at least 5 characters "})
  )()
});
interface DetailParams {
  id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial} = rootStore.productStore;
  
  const { loadBrands, brandsData } = rootStore.brandStore;

  const { loadSectors, sectorsData } = rootStore.sectorStore;
  const { loadProduct, submitting, createProduct, editProduct } = rootStore.productStore;

  const [product, setProduct] = useState(new ProductFormValues());
  useEffect(() => {
    if (match.params.id) {
      loadProduct(match.params.id).then((product) =>
        setProduct(new ProductFormValues(product))
      );
    }
  }, [loadProduct, match.params.id]);

  useEffect(() => {
    loadSectors();
  }, [loadSectors]);
  useEffect(() => {
    loadBrands();
  }, [loadBrands]);
  const handleFinalFormSubmit = (values: any) => {
    const { ...product } = values;
    if (!product.productId) {
      let newProduct = {
        ...product,
        productId: uuid(),
      };
      createProduct(newProduct);
    } else {
      editProduct(product);
    }
  };
  if (loadingInitial)
    return <LoadingComponent content="Loading data..." />;
  return (
    <Segment clearing style={{margin:"4em"}}>
      <FinalForm
        validate={validate}
        initialValues={product}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit,invalid,pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="productName"
              placeholder="Product Name"
              value={product.productName}
              component={TextInput}
            />

            <Field
              component={SelectInput}
              options={sectorsData.map((sector) => ({
                key: sector.sectorId,
                value: sector.sectorName,
                text: sector.sectorName,
              }))}
              placeholder="Select Sector"
              name="sector"
              value={product.sector}
            />

            <Field
              value={product.brand}
              component={SelectInput}
              placeholder="Select Brand"
              name="brand"
              options={brandsData.map((brand) => ({
                key: brand.brandId,
                value: brand.brandName,
                text: brand.brandName,
              }))}
            />
            <Field
              component={NumberInput}
              name="valueOfProduct"
              type="number"
              step="0.01"
              placeholder="ValueOfProduct"
              value={product.valueOfProduct}
            />
            <Field
              component={TextInput}
              name="modelYear"
              type="date"
              placeholder="Model Year"
              value={product.modelYear}
            />
            <Field
              component={NumberInput}
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={product.quantity}
            />
            <Field
              name="description"
              rows={3}
              placeholder="Description"
              value={product.description}
              component={TextAreaInput}
            />
            <Button
              loading={submitting}
              disabled={invalid||pristine}
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
        )}
      />
    </Segment>
  );
};

export default observer(ProductForm);
