import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import LoadingComponent from "../LoadingComponent";

const DashboardContent: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadContactForms,deleteContactForm,submitting,target,loadingInitial,contactFormData} = rootStore.contactFormStore;

  useEffect(() => {
    loadContactForms();
  }, [loadContactForms]);

  if (loadingInitial)
    return <LoadingComponent content='Loading problems...' />;
  return (
    <Fragment>
      <Card.Group style={{ marginTop: "10em", marginLeft: "16em" }}>
        {contactFormData.map((contactForm) => (
          <Card style= {{marginRight:"57px"}} key={contactForm.id}>
            <Card.Content>
              <Card.Header>{contactForm.firstName} {contactForm.lastName}</Card.Header>
              <Card.Description>
                {contactForm.message}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green"
                nama={contactForm.id}
                loading={target === contactForm.id && submitting}
                onClick={(e) => deleteContactForm(e, contactForm.id)}
                floated="right"
                content="Delete">
                  Done
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Fragment>
  );
};

export default observer(DashboardContent);
