import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Card, Button } from "semantic-ui-react";
import ContactFormStore from "../../stores/contactFormStore";

const DashboardContent = () => {
  const contactFormStore = useContext(ContactFormStore);
  const { contactFormData } = contactFormStore;

  return (
    <Fragment>
      <Card.Group style={{ marginTop: "20em", marginLeft: "16em" }}>
        {contactFormData.map((contactForm) => (
          <Card key={contactForm.id}>
            <Card.Content>
              <Card.Header>{contactForm.firstName} {contactForm.lastName}</Card.Header>
              <Card.Description>
                {contactForm.message}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green">
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
