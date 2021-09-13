import React from 'react';
import { Card,Button } from 'semantic-ui-react';
import { ISector } from '../../../app/models/sector';

interface IProps {
    sector: ISector;
    setEditMode: (editMode: boolean) => void;
    setSelectedSector: (sector: ISector | null) => void;
}

const SectorDetails: React.FC<IProps> = ({sector, setEditMode, setSelectedSector}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{sector.sectorName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
            <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit' />
            <Button onClick={() => setSelectedSector(null)} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default SectorDetails;
