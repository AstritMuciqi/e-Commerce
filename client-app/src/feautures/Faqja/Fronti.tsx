import React from 'react'
import { Grid } from 'semantic-ui-react'
import { DetajetKlientit } from '../Details/DetajetKlientit'
import { DetajetProduktit } from '../Details/DetajetProduktit'
export const Fronti = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
    <DetajetKlientit/>
    </Grid.Column>
    <Grid.Column width={4}>
      <DetajetProduktit/>
    </Grid.Column>
    </Grid>
  )
}

