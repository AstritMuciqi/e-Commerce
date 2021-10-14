import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const SectorDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { sector, loadSector, loadingInitial } = rootStore.sectorStore;

  useEffect(() => {
    loadSector(match.params.id);
  }, [loadSector, match.params.id]);
  if (loadingInitial || !sector)
    return <LoadingComponent content="Loading Sector..." />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{sector.sectorName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/manage/sector/${sector.sectorId}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push("/dashboard/productmaster/sectors")}
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
