import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import { ISector } from '../../app/models/sector';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  sector: ISector;
  createSector: (sector: ISector) => void;
  editSector: (sector: ISector) => void;
  submitting: boolean;
}

const SectorForm: React.FC<IProps> = ({
  setEditMode,
  sector: initialFormState,
  editSector,
  createSector,
  submitting
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        sectorId: '',
        sectorName: '',  
      };
    }
  };

  const [sector, setSector] = useState<ISector>(initializeForm);

  const handleSubmit = () => {
    if (sector.sectorId.length === 0) {
      let newSector = {
        ...sector,
        sectorId: uuid()
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
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default SectorForm;
