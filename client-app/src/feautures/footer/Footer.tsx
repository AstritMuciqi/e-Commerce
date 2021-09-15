import React from "react";
import { Grid, Icon, Menu } from "semantic-ui-react";
import { ISector } from "../../app/models/sector";
interface IProps {
  sectors:ISector[];
  // selectActivity: (id: string) => void;
  // selectedActivity: IActivity | null;
  // editMode: boolean;
  // setEditMode: (editMode: boolean) => void;
  // setSelectedActivity: (activity: IActivity | null) => void;
  // createActivity: (activity: IActivity) => void;
  // editActivity: (activity: IActivity) => void;
  // deleteActivity: (id: string) => void;
}

  const Footer: React.FC<IProps> = ({
    sectors,
    // selectProduct,
    // selectedProduct,
    // editMode,
    // setEditMode,
    // setSelectedProduct,
    // createProduct,
    // editProduct,
    // deleteProduct,
    // openCreateForm
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
            <a>RRETH NESH</a>
          </Grid.Column>
          <Grid.Column>
            <a>
              <Icon style={{ marginBottom: "6px"}} name="home" size="large" />
              ELEZ BERISHA, 10000, PRISHTINË
            </a>
          </Grid.Column>
          <Grid.Column>
            <a>Kyqu</a>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ fontSize: "15px",marginLeft:"45px" }}>
          <Grid.Column>
            <a>TRANSPORTI</a>
          </Grid.Column>
          <Grid.Column>
            <a>
              <Icon style={{ marginBottom: "6px" }} name="phone" size="large" />
              +383 (0) 43 99 77 00
            </a>
          </Grid.Column>
          <Grid.Column>
            <a>Regjistrohu</a>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ fontSize: "15px",marginLeft:"45px"}}>
          <Grid.Column>
            <a>POLITIKA E PRIVATËSISË</a>
          </Grid.Column>
          <Grid.Column>
            {" "}
            <a>
              <Icon style={{ marginBottom: "6px" }} name="mail" size="large" />
              INFO@SmartStore.COM
            </a>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ fontSize: "15px",marginLeft:"45px"}}>
          <Grid.Column>
            <a>GARANCIONI DHE SERVISI</a>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      // <List
      //   horizontal
      // style={{
      //   marginTop: "20px",
      //   marginLeft: "20px",
      //   height: "500px",
      //   backgroundColor: "white",
      //   width: "1220px",
      //   border: "2px solid rgb(246, 248, 239)",
      //   textTransform: "uppercase",

      // }}
      // >
      //   <List.Item style={{ fontSize: "20px" }}>
      //     <ol>
      //       <b style={{ fontWeight: "bolder",marginBottom:"60px" }}>Llogaria</b>
      //       <ul style={{ marginTop: "20px" }}>
      //         <a>Kyqu</a>
      //       </ul>
      //       <ul style={{ marginTop: "20px" }}>
      //         <a>Regjistrohu</a>
      //       </ul>
      //     </ol>
      //   </List.Item>
      //   <List.Item style={{ marginLeft: "70px", fontSize: "20px" }}>
      //     <ol>
      //       <b style={{ fontWeight: "bolder" }}>Kujdesi ndaj Klienteve</b>
      //       <ul style={{ marginTop: "20px" }}>
      //         <a>RRETH NESH</a>
      //       </ul>
      //       <ul style={{ marginTop: "20px" }}>
      //         <a>TRANSPORTI</a>
      //       </ul>{" "}
      //       <ul style={{ marginTop: "20px" }}>
      //         <a>POLITIKA E PRIVATËSISË</a>
      //       </ul>
      //       <ul style={{ marginTop: "20px" }}>
      //         <a>GARANCIONI DHE SERVISI</a>
      //       </ul>
      //     </ol>
      //   </List.Item>
      //   <List.Item
      //     style={{ marginLeft: "69px", fontSize: "20px", marginRight: "60px" }}
      //   >
      // <ol>
      //   <ul style={{ marginTop: "20px" }}>
      //     <a>
      //       <Icon
      //         style={{ marginBottom: "6px" }}
      //         name="home"
      //         size="large"
      //       />
      //       ELEZ BERISHA, 10000, PRISHTINË
      //     </a>
      //   </ul>
      //   <ul style={{ marginTop: "20px" }}>
      //     <a>
      //       <Icon
      //         style={{ marginBottom: "6px" }}
      //         name="phone"
      //         size="large"
      //       />
      //       +383 (0) 43 99 77 00
      //     </a>
      //   </ul>
      //   <ul style={{ marginTop: "20px" }}>
      //     <a>
      //       <Icon
      //         style={{ marginBottom: "6px" }}
      //         name="mail"
      //         size="large"
      //       />
      //       INFO@SmartStore.COM
      //     </a>
      //   </ul>
      // </ol>
      //   </List.Item>
      // </List>
    );
  };
  
  export default Footer;
  