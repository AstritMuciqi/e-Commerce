import { observer } from "mobx-react-lite";
import React, { useState,  useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {  SectorFormValues } from "../../app/models/sector";
import SectorStore from "../../app/stores/sectorStore";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import {
  combineValidators,
  isRequired,
} from "revalidate";

const validate = combineValidators({
  sectorName: isRequired({ message: "The sector name is required" }),
});
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
  } = sectorStore;
  const [sector, setSector] = useState(new SectorFormValues());
  useEffect(() => {
    if (match.params.id) {
      loadSector(match.params.id).then((sector) =>
        setSector(new SectorFormValues(sector))
      );
    }
  }, [loadSector, match.params.id]);
  useEffect(() => {
    loadSectors();
  }, [loadSectors]);
  const handleFinalFormSubmit = (values: any) => {
    const{...sector} = values;
    if (!sector.sectorId) {
      let newSector = {
        ...sector,
        sectorId: uuid(),
      };
      createSector(newSector);
    } else {
      editSector(sector);
    }
  };

  if (sectorStore.loadingInitial)
    return <LoadingComponent content="Loading data..." />;

  return (
    <Segment clearing>
      <FinalForm
        validate={validate}
        initialValues={sector}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit,invalid,pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              component={TextInput}
              name="sectorName"
              placeholder="Sector Name"
              value={sector.sectorName}
            />
            <Button
              loading={submitting}
              disabled={invalid||pristine}
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
        )}
      />
    </Segment>
  );
};

export default observer(SectorForm);
