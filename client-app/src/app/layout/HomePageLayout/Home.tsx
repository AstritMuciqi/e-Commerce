import React, { Fragment } from "react";
import ImageSlider from "../../../feautures/Details/HomeDetails/Slider/components/ImageSlider";
import { SliderData } from "../../../feautures/Details/HomeDetails/Slider/components/SliderData";
import { Container } from "semantic-ui-react";
import Navbar from "../../../feautures/nav/NavBar";
import HomeItems from "../../../feautures/Details/HomeDetails/ProductItems/HomeItems";
import "../../layout/styles.css";
import Footer from "../../../feautures/footer/Footer";

const Home = () => {
  return (
    <Fragment>
      <Container>
        <Navbar />
        <ImageSlider slides={SliderData} />
      </Container>
      <HomeItems />
      <Footer />
    </Fragment>
  );
};

export default Home;
