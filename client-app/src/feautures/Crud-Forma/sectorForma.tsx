import { observer } from "mobx-react-lite";
import React, { useState, FormEvent, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { ISector } from "../../app/models/sector";
import SectorStore from "../../app/stores/sectorStore";

interface DetailParams {
  id: string;
}

const SectorForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const sectorStore = useContext(SectorStore);
  const {
    createSector,
    loadSectors,
    editSector,
    submitting,
    loadSector,
    clearSector,
    sector: initialFormState,
  } = sectorStore;
  const [sector, setSector] = useState<ISector>({
    sectorId: "",
    sectorName: "",
  });
  useEffect(() => {
    if (match.params.id && sector.sectorId.length === 0) {
      loadSector(match.params.id).then(
        () => initialFormState && setSector(initialFormState)
      );
    }
    return () => {
      clearSector();
    };
  }, [loadSector, match.params.id, clearSector, initialFormState,sector.sectorId.length]);
  useEffect(() => {
    loadSectors();
  }, [loadSectors]);


  const handleSubmit = () => {
    if (sector.sectorId.length === 0) {
      let newSector = {
        ...sector,
        sectorId: uuid(),
      };
      createSector(newSector).then(() => history.push(`/sector/edit/${newSector.sectorId}`));
    } else {
      editSector(sector).then(()=>history.push(`/sector/edit/${sector.sectorId}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setSector({ ...sector, [name]: value });
  };

  if (sectorStore.loadingInitial)
    return <LoadingComponent content="Loading data..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="sectorName"
          placeholder="Sector Name"
          value={sector.sectorName}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push("/dashboard/productmaster/sectors")}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(SectorForm);
