import { observer } from 'mobx-react-lite';
import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Segment, Form, Button } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import { ISector } from '../../app/models/sector';
import SectorStore from '../../app/stores/sectorStore';

interface DetailParams {
  id: string;
}

const SectorForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const sectorStore = useContext(SectorStore);
  const { createSector, editSector, submitting,loadSector,clearSector,sector:initialFormState} = sectorStore;
  useEffect(() => {
    if (match.params.id) {
      loadSector(match.params.id).then(
        () => initialFormState && setSector(initialFormState)
      );
    }
    return()=>{
      clearSector()
    }
  },[loadSector,match.params.id,clearSector,initialFormState]);
  

  const [sector, setSector] = useState<ISector>({
    sectorId: "",
    sectorName: "",
  });

  const handleSubmit = () => {
    if (sector.sectorId.length === 0) {
      let newSector = {
        ...sector,
        sectorId: uuid(),
      };
      createSector(newSector);
    } else {
      editSector(sector);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setSector({ ...sector, [name]: value });
  };


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
          onClick={()=>history.push('/dashboard/productmaster/sector')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(SectorForm);
