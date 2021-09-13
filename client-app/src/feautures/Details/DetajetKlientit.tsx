import React from 'react'
import { Button, Container, Segment } from 'semantic-ui-react'

export const DetajetKlientit = () => {
    return (
        <div>
     <Container>
    <Segment  tertiary clearing>
      <Button size = 'tiny' floated="right" content="Ndrysho" color="black"></Button>
      <p>1     TË KYÇUR SI BESARDURGUTI@HOTMAIL.COM</p>
      </Segment>
      <Segment textAlign='center' tertiary clearing>
      <Button  size = 'tiny' floated="right" content="Ndrysho" color="black"></Button>
      <p>2     ADRESA E FATURIMIT DHE E TRANSPORTIT</p>
      </Segment>
      <Segment textAlign='center' tertiary clearing>
      <Button  size = 'tiny' floated="right" content="Ndrysho" color="black"></Button>
      <p>3     TË KYÇUR SI BESARDURGUTI@HOTMAIL.COM</p>
      </Segment>
      <Segment textAlign='center' tertiary clearing>
      <Button  size = 'tiny' floated="right" content="Ndrysho" color="black"></Button>
      <p>4 MËNYRAT E TRANSPORTIT</p>
      </Segment>
      </Container>
        </div>
    )
}
