import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import SectorList from "./SectorList";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const SectorDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadSectors,loadingInitial} = rootStore.sectorStore;

  useEffect(() => {
    loadSectors();
  }, [loadSectors]);
  if (loadingInitial)
    return <LoadingComponent content="Loading Sectors..." />;

  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <SectorList />
    </Container>
  );
};

export default observer(SectorDashboard);
