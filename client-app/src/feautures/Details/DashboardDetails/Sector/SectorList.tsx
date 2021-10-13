import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Table } from "semantic-ui-react";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import SectorStore from "../../../../app/stores/sectorStore";

const SectorList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { deleteSector, sectorsData, submitting, target } = rootStore.sectorStore;
  return (
    <Table style={{ marginLeft: "97px" }} celled inverted selectable>
      <Table.Header fullWidth>
        <Table.Row style={{ backgroundColor: "#F5BD3D" }}>
          <Table.HeaderCell style={{ backgroundColor: "#F5BD3D" }}>
            <b style={{ color: "black" }}>Sector Name</b>
          </Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: "#F5BD3D" }}>
            <b style={{ marginLeft: "711px", color: "black" }}>Options</b>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {sectorsData.map((sector) => (
          <Table.Row positive key={sector.sectorId}>
            <Table.Cell>{sector.sectorName}</Table.Cell>
            <Table.Cell colSpan="2">
              <Button.Group floated="right">
                <Button
                  as={Link}
                  to={`/manage/sector/${sector.sectorId}`}
                  floated="right"
                  content="Edit"
                />
                <Button.Or />
                <Button
                  name={sector.sectorId}
                  loading={target === sector.sectorId && submitting}
                  onClick={(e) => deleteSector(e, sector.sectorId)}
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
              as={Link}
              to="/createSector"
              style={{
                backgroundColor: "black",
                color: "white",
                width: "157px",
              }}
              floated="right"
              icon
              labelPosition="left"
              size="small"
            >
              <Icon name="stripe s" />
              Add Sector
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default observer(SectorList);
