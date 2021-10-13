import React, { useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import ProductList from "./UserList";
import { observer } from "mobx-react-lite";
import userStore from '../../../../app/stores/userStore'
import LoadingComponent from "../../../../app/layout/LoadingComponent";
const UserDashboard: React.FC = () => {
  const userStore = useContext(UserStore);


  if (userStore.loadingInitial)
    return <LoadingComponent content='Loading Clients...' />;
  return (
    <Container style={{ marginTop: "125px", width: "1055px" }}>
      <ProductList />
    </Container>
  );
};

export default observer(UserDashboard);
