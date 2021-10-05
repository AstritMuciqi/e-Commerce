import React, { Fragment } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import "../../app/layout/styles.css";
import Navbar from "../nav/NavBar";

const ContactForm = () => {
  return (
    <Fragment>
      <Navbar />
      <Segment
        inverted
        style={{ margin: "5em", marginTop: "16em", backgroundColor: "gray" }}
      >
        <Segment
          inverted
          style={{ backgroundColor: "gray", borderBottom: "2px solid black" }}
        >
          <p style={{ fontSize: "20px",color:"black" }}><b>Contact Us</b></p>
        </Segment>
        <Form style={{ margin: "2em" }}>
          <Form.Field>
            <label style={{ color: "black" }}>First Name</label>
            <input placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label style={{ color: "black" }}>Last Name</label>
            <input placeholder="Last Name" />
          </Form.Field>
          <Form.Field>
            <label style={{ color: "black" }}>E-Mail</label>
            <input placeholder="E-Mail" />
          </Form.Field>
          <Form.TextArea label='Message' placeholder='Tell us your problem...' />
          <Button type="cancel">
            Cancel
          </Button>
          <Button secondary type="submit">
            Submit
          </Button>

        </Form>
      </Segment>
    </Fragment>
  );
};

export default observer(ContactForm);
