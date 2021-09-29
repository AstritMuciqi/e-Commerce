import React, { Fragment } from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Navbar from "../../feautures/nav/NavBar";
import Footer from "../../feautures/footer/Footer";
import "./styles.css";
const NotFound = () => {
  return (
    <Fragment>
      <Navbar />
      <Segment placeholder style={{marginTop:"16em"}}>
        <Header icon>
          <Icon name="search" />
          Oops - we've looked everywhere but couldn't find this.
        </Header>
        <Segment.Inline>
          <Button as={Link} to="/" primary>
            Return to Home page
          </Button>
        </Segment.Inline>
      </Segment>
      <Footer />
    </Fragment>
  );
};

export default NotFound;
