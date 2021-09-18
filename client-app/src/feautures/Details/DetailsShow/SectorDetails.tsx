import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card,Button } from 'semantic-ui-react';
import SectorStore from '../../../app/stores/sectorStore';


const SectorDetails: React.FC = () => {
  const sectorStore = useContext(SectorStore);
  const{selectedSector:sector,openEditForm,cancelSelectedSector}= sectorStore;
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{sector!.sectorName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(sector!.sectorId)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedSector}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(SectorDetails);
