import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import SectorList from "./SectorList";
import SectorStore from "../../../../app/stores/sectorStore";
import LoadingComponent from "../../../../app/layout/LoadingComponent";

const SectorDashboard: React.FC = () => {
  const sectorStore = useContext(SectorStore);

  useEffect(() => {
    sectorStore.loadSectors();
  }, [sectorStore]);
  if (sectorStore.loadingInitial)
    return <LoadingComponent content="Loading sectors..." />;

  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <SectorList />
    </Container>
  );
};

export default observer(SectorDashboard);
