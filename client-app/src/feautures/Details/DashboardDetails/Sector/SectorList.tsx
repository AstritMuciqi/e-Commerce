import React from 'react';
import {  Button, Icon,  Table } from 'semantic-ui-react';
import '../../../../app/layout/DashboardLayout/styles.css';
import { ISector } from '../../../../app/models/sector';
interface IProps {
  sectors: ISector[];
   selectSector: (sectorId: string) => void;
   deleteSector: (sectorId: string) => void;
   openCreateForm: () => void;
}


const SectorList: React.FC<IProps> = ({
  sectors,
  selectSector,
  deleteSector,
  openCreateForm

}) => {
  return (
    <div>
      <Table celled inverted selectable>
        <Table.Header fullWidth >
          <Table.Row  >
            <Table.HeaderCell>Sector Name</Table.HeaderCell>
            <div className="th">
            <Table.HeaderCell>Options</Table.HeaderCell>

            </div>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sectors.map((sector) => (
            <Table.Row positive key={sector.sectorId}>
              <Table.Cell >{ sector.sectorName}</Table.Cell>
              <Table.Cell colSpan="2">
              <Button.Group floated="right">
                  <Button
                    onClick={() => selectSector(sector.sectorId)}
                    floated="right"
                    content="Edit"
                  />
                  <Button.Or />
                  <Button
                    onClick={() => deleteSector(sector.sectorId)}
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
                <Icon name="stripe s" /> Add Sector
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default SectorList;
