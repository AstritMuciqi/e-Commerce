import React, { useState, useEffect, useContext, Fragment } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import ContactFormStore from "../../app/stores/contactFormStore";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import "../../app/layout/styles.css";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from "revalidate";
import Navbar from "../nav/NavBar";
import { ContactFormValues } from "../../app/models/contactForm";
import Footer from "../footer/Footer";

const validate = combineValidators({
  firstName: isRequired({ message: "First Name is required" }),
  lastName: isRequired({ message: "Last Name is required" }),
  message: composeValidators(
    isRequired("Message"),
    hasLengthGreaterThan(4)({
      message: "Message needs to be at least 5 characters ",
    })
  )(),
});
interface DetailParams {
  id: string;
}

const KontaktForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const contactFormStore = useContext(ContactFormStore);
  const { loadContactForm, submitting, createContactForm, editContactForm } =
    contactFormStore;

  const [contactForm, setContactForm] = useState(new ContactFormValues());
  useEffect(() => {
    if (match.params.id) {
      loadContactForm(match.params.id).then((contactForm) =>
        setContactForm(new ContactFormValues(contactForm))
      );
    }
  }, [loadContactForm, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...contactForm } = values;
    if (!contactForm.id) {
      let newContactForm = {
        ...contactForm,
        id: uuid(),
      };
      createContactForm(newContactForm);
    } else {
      editContactForm(contactForm);
    }
  };
  return (
    <Fragment>
      <Navbar />
      <Segment
        clearing
        inverted
        style={{ margin: "5em", marginTop: "16em", backgroundColor: "gray" }}
      >
        <Segment
          inverted
          style={{ backgroundColor: "gray", borderBottom: "2px solid black" }}
        >
          <p style={{ fontSize: "20px",color:"black" }}><b>Contact Us</b></p>
        </Segment>
        <FinalForm
          validate={validate}
          initialValues={contactForm}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="firstName"
                placeholder="First Name"
                value={contactForm.firstName}
                component={TextInput}
              />

              <Field
                name="lastName"
                placeholder="Last Name"
                value={contactForm.lastName}
                component={TextInput}
              />
             
              <Field
                name="message"
                rows={3}
                placeholder="Message"
                value={contactForm.message}
                component={TextAreaInput}
              />
              <Button
                loading={submitting}
                disabled={invalid || pristine}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
              <Button
                onClick={() => history.push("/dashboard/contactUsClients/")}
                floated="right"
                type="button"
                content="Cancel"
              />
            </Form>
          )}
        />
      </Segment>
      <Footer/>
    </Fragment>
  );
};

export default observer(KontaktForm);
