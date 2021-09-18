import { observer } from 'mobx-react-lite';
import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import { ISector } from '../../app/models/sector';
import SectorStore from '../../app/stores/sectorStore';

interface IProps {
  sector: ISector;
}

const SectorForm: React.FC<IProps> = ({ sector: initialFormState }) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        sectorId: "",
        sectorName: "",
      };
    }
  };

  const [sector, setSector] = useState<ISector>(initializeForm);

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
  const sectorStore = useContext(SectorStore);
  const { createSector, editSector, submitting, cancelFormOpen } = sectorStore;

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
          onClick={cancelFormOpen}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(SectorForm);
