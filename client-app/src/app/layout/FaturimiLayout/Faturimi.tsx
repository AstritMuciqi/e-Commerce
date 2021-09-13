import React,{useState , useEffect , Fragment} from 'react';
import {Container, List} from 'semantic-ui-react';
import axios from 'axios';
import { IAdresaF } from '../../models/adresaF';

import { Fronti } from '../../../feautures/Faqja/Fronti';
import Navbar from '../../../feautures/nav/NavBar';
import Kategorite from '../../../feautures/nav/Kategorite';
import { ISector } from '../../models/sector';



const Faturimi = () => { //per me i tregu komponentit tone per interfacin IState , {} e shprazet eshte per properties , e dyta per state
 
  const [AdresaF, setAdresaF] = useState<IAdresaF[]>([]);
  const [sectors, setSectors] = useState<ISector[]>([]);


  useEffect(() => {
       axios.get<IAdresaF[]>('http://localhost:5000/api/AdresaFaturimit').then((response) => { //ktu ja kemi tregu axios se qfare lloji te adreses po kthejm , pra jo any me kon pasi po mundohemi me bo strong typing
      setAdresaF(response.data)
    });
  }, []); //kto dy kllapa sigurojne qe useEffect me run vec nje here , per shkak se qdoher kur komponenti renderet kjo use effect metoda kallet vec tu shtu [] e ndalim kete sjellje
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
    return (
      <Fragment>
        <Navbar sectors={sectors}/> 
        <Container style={{marginTop:'5em'}}>
          <Kategorite sectors={sectors}/>
          <h2>Blerje e sigurtë</h2>
        </Container>
        <Container style={{marginTop:'5em'}}>
         <Fronti/>
         </Container>
       
        <Container style={{marginTop:'7em'}}>
       <List>
         {AdresaF.map((adresa) => (
           <List.Item key={adresa.id}>{adresa.emri} {adresa.mbiemri}</List.Item>
         ))}
       </List>
       </Container>
      </Fragment>
    );
  }
 

export default Faturimi;
