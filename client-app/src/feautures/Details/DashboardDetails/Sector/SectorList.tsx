import React from 'react';
import {  Button, Icon,  Table } from 'semantic-ui-react';
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
      <Table style={{marginLeft:"104px"}}  inverted selectable>
        <Table.Header fullWidth >
          <Table.Row style={{backgroundColor:"#F5BD3D"}} >
            <Table.HeaderCell style={{backgroundColor:"#F5BD3D"}}><b style={{color:'black'}}>Sector Name</b></Table.HeaderCell>
            <div style={{marginLeft:"710px"}} className="th">
            <Table.HeaderCell style={{backgroundColor:"#F5BD3D"}}><b style={{color:'black'}}>Options</b></Table.HeaderCell>

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
          <Table.Row style={{backgroundColor:"#F5BD3D"}} >
            <Table.HeaderCell colSpan="15">
            <Button style={{backgroundColor:"black",color:"white",width:"157px"}} onClick={openCreateForm}
                floated="right"
                icon
                labelPosition="left"
                size="small"
              >
                <Icon name="stripe s" />Add Sector
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div >
  );
};

export default SectorList;
