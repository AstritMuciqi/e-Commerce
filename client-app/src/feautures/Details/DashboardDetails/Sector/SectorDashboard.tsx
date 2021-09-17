import React, { SyntheticEvent } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { ISector } from '../../../../app/models/sector';
import SectorForm from '../../../Crud-Forma/sectorForma';
import SectorDetails from '../../DetailsShow/SectorDetails';
import SectorList from './SectorList';




interface IProps {
  sectors: ISector[];
  selectSector: (sectorId: string) => void;
  selectedSector: ISector | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedSector: (sector: ISector | null) => void;
  createSector: (sector: ISector) => void;
  editSector: (sector: ISector) => void;
  deleteSector: (event:SyntheticEvent<HTMLButtonElement>,sectorId: string) => void;
  openCreateForm: () => void;
  submitting: boolean;
  target:string;
}

const SectorDashboard: React.FC<IProps> = ({
  sectors,
  selectSector,
  selectedSector,
  editMode,
  setEditMode,
  setSelectedSector,
  createSector,
  editSector,
  deleteSector,
  openCreateForm,
  submitting,
  target
}) => {
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <SectorList
        openCreateForm={openCreateForm}
        sectors={sectors}
        selectSector={selectSector}
        deleteSector={deleteSector}
        submitting={submitting}
        target={target}
      />

      {selectedSector && !editMode && (
        <Container style={{ width: "400px" }}>
          <SectorDetails
            sector={selectedSector}
            setEditMode={setEditMode}
            setSelectedSector={setSelectedSector}
          />
        </Container>
      )}
      {editMode && (
        <Container style={{ width: "400px" }}>
          <SectorForm
            key={(selectedSector && selectedSector.sectorId) || 0}
            setEditMode={setEditMode}
            sector={selectedSector!}
            createSector={createSector}
            editSector={editSector}
            submitting={submitting}
          />
        </Container>
      )}
    </Container>
  );
};

export default SectorDashboard;
