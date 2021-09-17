import React, { SyntheticEvent } from 'react';
import {  Button, Icon,Table } from 'semantic-ui-react';
import { IBrand } from '../../../../app/models/brand';
interface IProps {
  brands: IBrand[];
  selectBrand: (brandId: string) => void;
  deleteBrand: (
    event: SyntheticEvent<HTMLButtonElement>,
    brandId: string
  ) => void;
  openCreateForm: () => void;
  submitting: boolean;
  target: string;
}


const BrandList: React.FC<IProps> = ({
  brands,
  selectBrand,
  deleteBrand,
  openCreateForm,
  submitting,
  target,
}) => {
  return (
    <div>
      <Table style={{ marginLeft: "104px" }} inverted selectable>
        <Table.Header fullWidth>
          <Table.Row style={{ backgroundColor: "#F5BD3D" }}>
            <Table.HeaderCell style={{ backgroundColor: "#F5BD3D" }}>
              <b style={{ color: "black" }}>Brand Name</b>
            </Table.HeaderCell>
            <div style={{ marginLeft: "765px" }} className="th">
              <Table.HeaderCell style={{ backgroundColor: "#F5BD3D" }}>
                <b style={{ color: "black" }}>Options</b>
              </Table.HeaderCell>
            </div>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {brands.map((brand) => (
            <Table.Row positive key={brand.brandId}>
              <Table.Cell>{brand.brandName}</Table.Cell>
              <Table.Cell colSpan="2">
                <Button.Group floated="right">
                  <Button
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
                onClick={openCreateForm}
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
    </div>
  );
};

export default BrandList;
