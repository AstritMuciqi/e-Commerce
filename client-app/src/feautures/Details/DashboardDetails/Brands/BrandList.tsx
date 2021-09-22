import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {  Button, Icon,Table } from 'semantic-ui-react';
import BrandStore from '../../../../app/stores/brandStore';

const BrandList: React.FC = () => {
  const brandStore = useContext(BrandStore);
  const {brands,selectBrand,deleteBrand,submitting,target} = brandStore;
  return (
    <Table style={{ marginLeft: "104px" }} celled inverted selectable>
      <Table.Header fullWidth>
        <Table.Row style={{ backgroundColor: "#F5BD3D" }}>
          <Table.HeaderCell style={{ backgroundColor: "#F5BD3D" }}>
            <b style={{ color: "black" }}>Brand Name</b>
          </Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: "#F5BD3D" }}>
            <b style={{ color: "black" }}>Options</b>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {brands.map((brand) => (
          <Table.Row positive key={brand.brandId}>
            <Table.Cell>{brand.brandName}</Table.Cell>
            <Table.Cell colSpan="2">
              <Button.Group floated="right">
                <Button
                  as={Link}
                  to={`/dashboard/productmaster/brand/${brand.brandId}`}
                  onClick={() => selectBrand(brand.brandId)}
                  floated="right"
                  content="Edit"
                />
                <Button.Or />
                <Button
                  name={brand.brandId}
                  loading={target === brand.brandId && submitting}
                  onClick={(e) => deleteBrand(e, brand.brandId)}
                  floated="right"
                  content="Delete"
                  negative
                />
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row style={{ backgroundColor: "#F5BD3D" }}>
          <Table.HeaderCell colSpan="15">
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                width: "157px",
              }}
              onClick={brandStore.openCreateForm}
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
            >
              <Icon name="bold" /> Add Brand
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default observer(BrandList);
