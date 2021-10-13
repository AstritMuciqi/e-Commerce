import React, { useContext } from "react";
import { Table } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../../app/stores/rootStore";

const UserList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { usersData, submitting, target } = rootStore.userStore;
  return (
    <Table style={{ marginLeft: "104px" }} celled inverted selectable>
      <Table.Header fullWidth>
        <Table.Row style={{ backgroundColor: "#F5BD3D" }}>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>First Name</b>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <b style={{ color: "black" }}>Email</b>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {usersData.map((user) => (
          <Table.Row positive key={user.displayName}>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.displayName}</Table.Cell>
            {/* <Table.Cell colSpan="2">
              <Button.Group>
                <Button
                  as={Link}
                  to={`/manage/product/${product.productId}`}
                  floated="right"
                  content="Edit"
                />
                <Button.Or />
                <Button
                  nama={product.productId}
                  loading={target === product.productId && submitting}
                  onClick={(e) => deleteProduct(e, product.productId)}
                  floated="right"
                  content="Delete"
                  negative
                />
              </Button.Group>
            </Table.Cell> */}
          </Table.Row>
        ))}
      </Table.Body>

      {/* <Table.Footer fullWidth>
        <Table.Row style={{ backgroundColor: "#F5BD3D" }}>
          <Table.HeaderCell colSpan="15">
            <Button
              as={Link}
              to="/createProduct"
              style={{
                backgroundColor: "black",
                color: "white",
                width: "157px",
              }}
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
            >
              <Icon name="product hunt" /> Add Product
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer> */}
    </Table>
  );
};

export default observer(UserList);
