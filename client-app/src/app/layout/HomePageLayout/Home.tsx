import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import ImageSlider from '../../../feautures/Details/HomeDetails/Slider/components/ImageSlider';
import { SliderData } from '../../../feautures/Details/HomeDetails/Slider/components/SliderData';
import { ISector } from '../../models/sector';
import { Container } from 'semantic-ui-react';
import Navbar from '../../../feautures/nav/NavBar';
import { IProduct } from '../../models/product';
import HomeItems from '../../../feautures/Details/HomeDetails/ProductItems/HomeItems';
import agent from '../../API/agent';
import '../../layout/styles.css';

export const Home = () => {
  const [sectors, setSectors] = useState<ISector[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);



  useEffect(() => {
    axios
      .get<ISector[]>("http://localhost:5000/api/sector")
      .then((response) => {
        let sectors: ISector[] = [];
        response.data.forEach((sector) => {
          sector.sectorName = sector.sectorName.split(".")[0];
          sectors.push(sector);
        });
        setSectors(sectors);
      });
  }, []);
  useEffect(() => {
    agent.Products.productList()
      .then((response) => {
        let products: IProduct[] = [];
        response.forEach((product) => {
          product.productName = product.productName.split(".")[0];
          products.push(product);
        });
        setProducts(products);
      });
  }, []);


  

  
  return (
    <Fragment>
      <Container>
        <Navbar sectors={sectors} />
        <ImageSlider slides={SliderData} />
      </Container>
          <HomeItems products={products} />
    </Fragment>
  );
}
