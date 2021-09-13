import React from 'react'
import {Grid}  from 'semantic-ui-react'

export const DetajetProduktit = () => {
    return (
       <Grid.Row className="gridi">
           <Grid>
               <h3 className="headeri1">Të dhënat e porosisë</h3>
           </Grid>
           <Grid>
            <tr>
                <td>Artikujt</td>
                <td  align='right'>Qmimi</td>
            </tr>
           </Grid>
       </Grid.Row>
    )
}
