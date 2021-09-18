import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import { ISector } from "../../app/models/sector";
interface IProps {
  sectors:ISector[];
}

  const Footer: React.FC<IProps> = ({
    sectors,

  }) => {
    return (
      <Grid
        columns={3}
        style={{
          marginTop: "20px",
          marginLeft: "20px",
          backgroundColor: "white",
          width: "1220px",
          border: "2px solid rgb(246, 248, 239)",
          textTransform: "uppercase",
        }}
      >
        <Grid.Row style={{ fontSize: "20px" }}>
          <Grid.Column>
            <b style={{ fontWeight: "bolder" }}>Kujdesi ndaj Klienteve</b>
          </Grid.Column>
          <Grid.Column>
            <b style={{ fontWeight: "bolder" }}>Kontakt</b>
          </Grid.Column>
          <Grid.Column>
            <b style={{ fontWeight: "bolder", marginBottom: "60px" }}>
              Llogaria
            </b>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{ fontSize: "15px",marginLeft:"45px" }}>
          <Grid.Column>
            <i>RRETH NESH</i>
          </Grid.Column>
          <Grid.Column>
            <i>
              <Icon style={{ marginBottom: "6px"}} name="home" size="large" />
              ELEZ BERISHA, 10000, PRISHTINË
            </i>
          </Grid.Column>
          <Grid.Column>
            <i>Kyqu</i>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ fontSize: "15px",marginLeft:"45px" }}>
          <Grid.Column>
            <i>TRANSPORTI</i>
          </Grid.Column>
          <Grid.Column>
            <i>
              <Icon style={{ marginBottom: "6px" }} name="phone" size="large" />
              +383 (0) 43 99 77 00
            </i>
          </Grid.Column>
          <Grid.Column>
            <i>Regjistrohu</i>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ fontSize: "15px",marginLeft:"45px"}}>
          <Grid.Column>
            <i>POLITIKA E PRIVATËSISË</i>
          </Grid.Column>
          <Grid.Column>
            {" "}
            <i>
              <Icon style={{ marginBottom: "6px" }} name="mail" size="large" />
              INFO@SmartStore.COM
            </i>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ fontSize: "15px",marginLeft:"45px"}}>
          <Grid.Column>
            <i>GARANCIONI DHE SERVISI</i>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    );
  };
  
  export default Footer;
  