import React from 'react';
import { Grid } from 'semantic-ui-react';
import { ISector } from '../../../../app/models/sector';
import SectorForm from '../../../Crud-Forma/sectorForma';
import SectorDetails from '../../DetailsShow/SectorDetails';
import SectorList from './SectorList';




interface IProps {
  sectors:ISector[];
  selectSector: (sectorId: string) => void;
  selectedSector: ISector | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedSector: (sector: ISector | null) => void;
  createSector: (sector: ISector) => void;
  editSector: (sector: ISector) => void;
  deleteSector: (sectorId: string) => void;
  openCreateForm: () => void;

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
  openCreateForm
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <SectorList
          openCreateForm={openCreateForm}
          sectors={sectors}
          selectSector={selectSector}
          deleteSector={deleteSector}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedSector && !editMode && (
          <SectorDetails
            sector={selectedSector}
            setEditMode={setEditMode}
            setSelectedSector={setSelectedSector}
          />
        )}
        {editMode && (
          <SectorForm
            key={(selectedSector && selectedSector.sectorId) || 0}
            setEditMode={setEditMode}
            sector={selectedSector!}
            createSector={createSector}
            editSector={editSector}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default SectorDashboard;
