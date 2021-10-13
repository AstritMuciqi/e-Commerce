import React, { useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import ProductList from "./UserList";
import { observer } from "mobx-react-lite";
import UserStore from '../../../../app/stores/userStore'
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import UserList from "./UserList";
import { RootStoreContext } from "../../../../app/stores/rootStore";
const UserDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {  usersData, submitting, target, loadingInitial,loadUsers} = rootStore.userStore;

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  if (loadingInitial)
    return <LoadingComponent content='Loading Clients...' />;
  return (
    <Container style={{ marginTop: "125px", width: "1055px",color:"black" }}>
      <UserList />
    </Container>
  );
};

export default observer(UserDashboard);
