import React from 'react';
import {  Button, Icon,Table } from 'semantic-ui-react';
import '../../../../app/layout/DashboardLayout/styles.css';
import { IBrand } from '../../../../app/models/brand';
interface IProps {
  brands: IBrand[];
  selectBrand: (brandId: string) => void;
  deleteBrand: (brandId: string) => void;
  openCreateForm: () => void;
}


const BrandList: React.FC<IProps> = ({
  brands,
  selectBrand,
  deleteBrand,
  openCreateForm

}) => {
  return (
    <div>
      <Table celled inverted selectable>
        <Table.Header fullWidth >
          <Table.Row  >
            <Table.HeaderCell>Brand Name</Table.HeaderCell>
            <div className="th">
            <Table.HeaderCell>Options</Table.HeaderCell>

            </div>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {brands.map((brand) => (
            <Table.Row positive key={brand.brandId}>
              <Table.Cell >{ brand.brandName}</Table.Cell>
              <Table.Cell colSpan="2">
              <Button.Group floated="right">
                  <Button
                    onClick={() => selectBrand(brand.brandId)}
                    floated="right"
                    content="Edit"
                  />
                  <Button.Or />
                  <Button
                    onClick={() => deleteBrand(brand.brandId)}
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
          <Table.Row>
            <Table.HeaderCell colSpan="15">
            <Button onClick={openCreateForm}
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
              >
                <Icon name="stripe s" /> Add Brand
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default BrandList;
