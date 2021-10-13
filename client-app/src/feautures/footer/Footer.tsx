import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import "../../app/layout/styles.css"

const Footer: React.FC = () => {
  return (
    <Grid
      columns={3}
      style={{
        backgroundColor:"black",
        marginTop: "20px",
        width: "1290px",
        textTransform: "uppercase",
      }}
    >
      <Grid.Row style={{ fontSize: "20px" }}>
        <Grid.Column>
          <b className="link" style={{ marginLeft:"10px",fontWeight: "bolder" }}>Kujdesi ndaj Klienteve</b>
        </Grid.Column>
        <Grid.Column>
          <b className="link" style={{  marginLeft:"10px",fontWeight: "bolder" }}>Kontakt</b>
        </Grid.Column>
        <Grid.Column>
          <b className="link" style={{  marginLeft:"10px",fontWeight: "bolder", marginBottom: "60px" }}>Llogaria</b>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row style={{ fontSize: "15px", marginLeft: "45px" }}>
        <Grid.Column>
          <i className="link">RRETH NESH</i>
        </Grid.Column>
        <Grid.Column>
          <i className="link">
            <Icon style={{ marginBottom: "6px" }} name="home" size="large" />
            ELEZ BERISHA, 10000, PRISHTINË
          </i>
        </Grid.Column>
        <Grid.Column>
          <i className="link" style={{marginLeft:"20px",}}>Kyqu</i>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ fontSize: "15px", marginLeft: "45px" }}>
        <Grid.Column>
          <i className="link">TRANSPORTI</i>
        </Grid.Column>
        <Grid.Column>
          <i className="link">
            <Icon style={{ marginBottom: "6px" }} name="phone" size="large" />
            +383 (0) 43 99 77 00
          </i>
        </Grid.Column>
        <Grid.Column>
          <i className="link" style={{marginLeft:"20px",}}>Regjistrohu</i>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ fontSize: "15px", marginLeft: "45px" }}>
        <Grid.Column>
          <i className="link">POLITIKA E PRIVATËSISË</i>
        </Grid.Column>
        <Grid.Column>
          {" "}
          <i className="link">
            <Icon style={{ marginBottom: "6px" }} name="mail" size="large" />
            INFO@SmartStore.COM
          </i>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ fontSize: "15px", marginLeft: "45px" }}>
        <Grid.Column>
          <i className="link">GARANCIONI DHE SERVISI</i>
        </Grid.Column>
        <Grid.Column>
          <a className="linkVisited"  href="/contactUs">
          <Icon style={{ marginBottom: "6px" }} name="wordpress forms" size="large" />
            Contact Us Form</a>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Footer;
