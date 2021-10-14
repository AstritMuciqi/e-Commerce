import React, { Fragment, useContext, useEffect } from "react";
import "../../app/layout/styles.css";
import { Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";

const Kategorite: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadSectors, loadingInitial} = rootStore.sectorStore;
  useEffect(() => {
    loadSectors();
  }, [loadSectors]);
  if(loadingInitial)return <LoadingComponent content="Loading..." />
  return (
    <Fragment>
      <Menu
        style={{
          borderTop: "2px solid green",
          marginTop: "127px",
          backgroundColor: "black",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {rootStore.sectorStore.sectorsData.map((sector) => (
          <Menu.Item
            key={sector.sectorId}
            style={{
              borderRight: "2px solid green",
              borderLeft: "2px solid green",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ul
              style={{
                textAlign: "center",
                fontSize: "15px",
                fontWeight: "bolder",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              <i className="link">{sector.sectorName}</i>
            </ul>
          </Menu.Item>
        ))}
      </Menu>
    </Fragment>
  );
};

export default observer(Kategorite);
