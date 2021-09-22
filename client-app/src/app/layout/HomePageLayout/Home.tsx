import React, { Fragment, useContext, useEffect } from "react";
import ImageSlider from "../../../feautures/Details/HomeDetails/Slider/components/ImageSlider";
import { SliderData } from "../../../feautures/Details/HomeDetails/Slider/components/SliderData";
import { Container } from "semantic-ui-react";
import Navbar from "../../../feautures/nav/NavBar";
import HomeItems from "../../../feautures/Details/HomeDetails/ProductItems/HomeItems";
import "../../layout/styles.css";
import Footer from "../../../feautures/footer/Footer";
import { observer } from "mobx-react-lite";
import ProductStore from "../../stores/productStore";
import SectorStore from "../../stores/sectorStore";
import { withRouter } from "react-router-dom";

const Home = () => {
  
  // const productStore=useContext(ProductStore);
  // const sectorStore=useContext(SectorStore);
  // useEffect(() => {
  //   productStore.loadProducts();
  // }, [productStore]);

  // useEffect(() => {
  //   sectorStore.loadSectors();
  // }, [sectorStore]);
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
