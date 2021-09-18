import { observer } from 'mobx-react-lite';
import React, { useContext } from "react";
import { Container } from 'semantic-ui-react';
import SectorForm from '../../../Crud-Forma/sectorForma';
import SectorDetails from '../../DetailsShow/SectorDetails';
import SectorList from './SectorList';
import SectorStore from '../../../../app/stores/sectorStore';



const SectorDashboard: React.FC = () => {
  const sectorStore = useContext(SectorStore);
  const  {editMode,selectedSector} = sectorStore;
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <SectorList/>

      {selectedSector && !editMode && (
        <Container style={{ width: "400px" }}>
          <SectorDetails />
        </Container>
      )}
      {editMode && (
        <Container style={{ width: "400px" }}>
          <SectorForm
            key={(selectedSector && selectedSector.sectorId) || 0}
            sector={selectedSector!}
          />
        </Container>
      )}
    </Container>
  );
};

export default observer(SectorDashboard) ;
